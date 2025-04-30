import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schema/projeto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [
    ProjectService,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]), // Export Mongoose model
  ],
})
export class ProjectModule {}