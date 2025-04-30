import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true }) titulo: string;
  @Prop({ required: false }) descricao: string;
  @Prop({ required: true, default: 'pending' }) status: string;
  @Prop({ required: false }) data_inicio: Date;
  @Prop({ required: false }) data_limite: Date;
  @Prop({ required: false }) data_conclusao: Date;
  @Prop({ required: true }) prioridade: string;
  @Prop({ required: true }) complexidade: number;
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projeto_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  criada_por_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  aprovada_por_id: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
