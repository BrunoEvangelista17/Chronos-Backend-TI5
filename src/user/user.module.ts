import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/usuario.schema';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ProjectModule,
    TaskModule,
  ],
  controllers: [UserController],
  providers: [UserService], // Remove ProjectModule, TaskModule
})
export class UserModule {}