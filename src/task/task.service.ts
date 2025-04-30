import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project, ProjectDocument } from 'src/schema/projeto.schema';
import { TaskUser, TaskUserDocument } from 'src/schema/tarefa-usuario.schema';
import { Task, TaskDocument } from 'src/schema/tarefa.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(TaskUser.name) private taskUserModel: Model<TaskUserDocument>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Validate project existence
    const project = await this.projectModel
      .findById(createTaskDto.projeto)
      .exec();
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    // Validate creator existence
    const creator = await this.userService.findOne(createTaskDto.criadaPor);
    if (!creator) {
      throw new NotFoundException('Usuário criador não encontrado');
    }

    // Validate approver existence (if provided)
    if (createTaskDto.aprovadaPor) {
      const approver = await this.userService.findOne(
        createTaskDto.aprovadaPor,
      );
      if (!approver) {
        throw new NotFoundException('Usuário aprovador não encontrado');
      }
    }

    // Explicitly exclude id
    const { ...safeTaskDto } = createTaskDto;

    // Create the task
    const task = new this.taskModel({
      ...safeTaskDto,
    });
    const savedTask = await task.save();

    // Handle assignments (create TaskUser entries for atribuicoes)
    if (createTaskDto.atribuicoes && createTaskDto.atribuicoes.length > 0) {
      for (const userId of createTaskDto.atribuicoes) {
        // Validate user existence
        const user = await this.userService.findOne(userId);
        if (!user) {
          throw new NotFoundException(
            `Usuário com ID ${userId} não encontrado`,
          );
        }

        // Check if user is part of the project
        const userInProject = project.users.some(
          (u) => u.id.toString() === userId,
        );
        if (!userInProject) {
          throw new BadRequestException(
            `Usuário com ID ${userId} não faz parte do projeto`,
          );
        }

        // Create TaskUser entry
        await this.taskUserModel.create({
          task_id: savedTask._id,
          user_id: userId,
          notificado_relacionada: false,
        });
      }
    }

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel
      .find()
      .populate('projeto criadaPor aprovadaPor atribuicoes')
      .exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate('projeto criadaPor aprovadaPor atribuicoes')
      .exec();
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Validate project existence if provided
    if (updateTaskDto.projeto) {
      const project = await this.projectModel
        .findById(updateTaskDto.projeto)
        .exec();
      if (!project) {
        throw new NotFoundException('Projeto não encontrado');
      }
    }

    // Validate creator existence if provided
    if (updateTaskDto.criadaPor) {
      const creator = await this.userService.findOne(updateTaskDto.criadaPor);
      if (!creator) {
        throw new NotFoundException('Usuário criador não encontrado');
      }
    }

    // Validate approver existence if provided
    if (updateTaskDto.aprovadaPor) {
      const approver = await this.userService.findOne(
        updateTaskDto.aprovadaPor,
      );
      if (!approver) {
        throw new NotFoundException('Usuário aprovador não encontrado');
      }
    }

    // Explicitly exclude id
    const { ...safeUpdateDto } = updateTaskDto;

    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, safeUpdateDto, { new: true })
      .populate('projeto criadaPor aprovadaPor atribuicoes')
      .exec();

    if (!updatedTask) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    // Handle assignments if provided
    if (updateTaskDto.atribuicoes && updateTaskDto.atribuicoes.length > 0) {
      // Remove existing TaskUser entries
      await this.taskUserModel.deleteMany({ task_id: id }).exec();

      const project = await this.projectModel
        .findById(updatedTask.projeto)
        .exec();
      for (const userId of updateTaskDto.atribuicoes) {
        const user = await this.userService.findOne(userId);
        if (!user) {
          throw new NotFoundException(
            `Usuário com ID ${userId} não encontrado`,
          );
        }

        const userInProject = project.users.some(
          (u) => u.id.toString() === userId,
        );
        if (!userInProject) {
          throw new BadRequestException(
            `Usuário com ID ${userId} não faz parte do projeto`,
          );
        }

        await this.taskUserModel.create({
          task_id: id,
          user_id: userId,
          notificado_relacionada: false,
        });
      }
    }

    return updatedTask;
  }

  async remove(id: string): Promise<void> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    // Remove associated TaskUser entries
    await this.taskUserModel.deleteMany({ task_id: id }).exec();
    await this.taskModel.findByIdAndDelete(id).exec();
  }

  async assignUserToTask(taskId: string, userId: string): Promise<TaskUser> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const project = await this.projectModel.findById(task.projeto).exec();
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const userInProject = project.users.some((u) => u.id.toString() === userId);
    if (!userInProject) {
      throw new BadRequestException(
        'Usuário não faz parte do projeto da tarefa',
      );
    }

    const existing = await this.taskUserModel
      .findOne({
        task_id: task._id,
        user_id: userId,
      })
      .exec();

    if (existing) {
      throw new BadRequestException('Usuário já está atribuído à tarefa');
    }

    // Update task.atribuicoes
    await this.taskModel
      .findByIdAndUpdate(taskId, {
        $addToSet: { atribuicoes: userId },
      })
      .exec();

    return this.taskUserModel.create({
      task_id: task._id,
      user_id: userId,
      notificado_relacionada: false,
    });
  }

  async completeTask(
    taskId: string,
    userId: string,
    tempo_gasto_horas: number,
  ): Promise<TaskUser> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const userTask = await this.taskUserModel
      .findOneAndUpdate(
        { task_id: taskId, user_id: userId },
        {
          tempo_gasto_horas,
          concluida_em: new Date(),
        },
        { upsert: true, new: true },
      )
      .exec();

    await this.taskModel
      .findByIdAndUpdate(taskId, {
        status: 'done',
        dataConclusao: new Date(),
      })
      .exec();

    return userTask;
  }
}
