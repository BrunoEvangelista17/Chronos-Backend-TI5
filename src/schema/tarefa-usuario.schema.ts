import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskUserDocument = TaskUser & Document;

@Schema({ timestamps: true })
export class TaskUser {
  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  task: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop()
  tempoGastoHoras?: number;

  @Prop()
  concluidaEm?: Date;

  @Prop({ required: true, default: false })
  notificadoRelacionada: boolean;
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUser);
