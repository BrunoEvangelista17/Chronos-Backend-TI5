import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskUsuarioDocument = TaskUsuario & Document;

@Schema()
export class TaskUsuario {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: true }) task_id: number;
  @Prop({ required: true }) usuario_id: number;
  @Prop({ required: false }) tempo_gastto_horas: number;
  @Prop({ required: false }) concluida_em: Date;
  @Prop({ required: true }) notificado_relacionada: boolean;
}

export const TaskUsuarioSchema = SchemaFactory.createForClass(TaskUsuario);
