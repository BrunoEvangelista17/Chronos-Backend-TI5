import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @Get('user/:userId')
  async getTasksByUser(@Param('userId') userId: string) {
    return this.taskService.findByUser(userId);
  }

  @Get('burndown/:projectId')
  async burndown(
    @Param('projectId') projectId: string,
    @Query('start') start: string,
  ) {
    return this.taskService.getBurndown(projectId, start);
  }

  @Get('projection/:projectId')
  async projection(
    @Param('projectId') projectId: string,
    @Query('start') start: string,
  ) {
    return this.taskService.getProjection(projectId, start);
  }
}
