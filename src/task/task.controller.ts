import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { isValidObjectId } from 'mongoose';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskService.create(createTaskDto);
      return { message: 'Tarefa criada com sucesso', data: task };
    } catch (error) {
      throw new HttpException(
        'Erro ao criar a tarefa: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    const tasks = await this.taskService.findAll();
    return { message: 'Lista de tarefas', data: tasks };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    const task = await this.taskService.findOne(id);
    return { message: 'Tarefa encontrada', data: task };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    if (!isValidObjectId(id)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }

    const updated = await this.taskService.update(id, updateTaskDto);
    return { message: 'Tarefa atualizada com sucesso', data: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }

    const deleted = await this.taskService.remove(id);
    return { message: 'Tarefa removida com sucesso', data: deleted };
  }
}
