import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schema/projeto.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    return await project.save();
  }

  async findAll() {
    return this.projectModel.find();
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) throw new NotFoundException('Projeto não encontrado');
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updated = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Projeto não encontrado');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.projectModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Projeto não encontrado');
    return deleted;
  }
}
