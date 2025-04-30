import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schema/usuario.schema';
import { Project } from 'src/schema/projeto.schema';
import { Task } from 'src/schema/tarefa.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) throw new NotFoundException('Usuário não encontrado');

    // Atualizar o nome do usuário nos projetos onde ele aparece
    await this.projectModel.updateMany(
      { 'users.id': id },
      { $set: { 'users.$[elem].nome': updatedUser.nome } },
      { arrayFilters: [{ 'elem.id': id }] },
    );

    return updatedUser;
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async assignUserToProject(userId: string, projectId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Projeto não encontrado');

    const alreadyInProject = project.users?.some((u) => u.id === user.id);
    if (!alreadyInProject) {
      project.users = [
        ...(project.users || []),
        {
          id: user.id,
          nome: user.nome,
          email: user.email,
          papel: user.papel,
        },
      ];
      await project.save();
    }

    // Atualizar tarefas criadas por esse usuário (opcional)
    await this.taskModel.updateMany(
      { criada_por_id: user.id },
      { $set: { criada_por_nome: user.nome } }, // Exemplo de atualização
    );

    await this.taskModel.updateMany(
      { aprovada_por_id: user.id },
      { $set: { aprovada_por_nome: user.nome } },
    );

    return {
      message:
        'Usuário associado ao projeto com sucesso e registros atualizados',
    };
  }
}
