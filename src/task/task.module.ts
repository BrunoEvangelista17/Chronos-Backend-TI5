import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schema/tarefa.schema';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [
    TaskService,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), // Export Mongoose model
  ],
})
export class TaskModule {}