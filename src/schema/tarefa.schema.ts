import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao?: string;

  @Prop({ required: true, default: 'pending' })
  status: string; // Ex: pending, doing, done

  @Prop()
  dataInicio?: Date;

  @Prop()
  dataLimite?: Date;

  @Prop()
  dataConclusao?: Date;

  @Prop({ required: true })
  prioridade: string; // Ex: baixa, média, alta

  @Prop({ required: true })
  complexidade: number;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projeto: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  criadaPor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  aprovadaPor?: Types.ObjectId;

  // Caso deseje armazenar todos os usuários atribuídos diretamente na tarefa
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  atribuicoes?: Types.ObjectId[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
