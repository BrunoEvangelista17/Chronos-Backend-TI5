// src/schema/tarefa.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  // adiciona o campo id no schema, com default uuid e unique index
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao?: string;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop()
  dataInicio?: Date;

  @Prop()
  dataLimite?: Date;

  @Prop()
  dataConclusao?: Date;

  @Prop({ required: true })
  prioridade: string;

  @Prop({ required: true })
  complexidade: number;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projeto: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  criadaPor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  aprovadaPor?: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  atribuicoes?: Types.ObjectId[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
