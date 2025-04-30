import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskDocument } from 'src/schema/tarefa.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel
      .find()
      .populate('projeto_id criada_por_id aprovada_por_id')
      .exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate('projeto_id criada_por_id aprovada_por_id')
      .exec();
    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }
    return updated;
  }

  async remove(id: string): Promise<Task> {
    const deleted = await this.taskModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }
    return deleted;
  }
}
