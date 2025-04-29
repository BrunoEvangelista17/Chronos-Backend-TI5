import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TarefaDocument = Tarefa & Document;

@Schema()
export class Tarefa {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: true }) titulo: string;
  @Prop({ required: false }) descricao: string;
  @Prop({ required: true }) status: string;
  @Prop({ required: false }) data_inicio: Date;
  @Prop({ required: false }) data_limite: Date;
  @Prop({ required: false }) data_conclusao: Date;
  @Prop({ required: true }) prioridade: string;
  @Prop({ required: true }) complexidade: number;
  @Prop({ required: true }) project_id: number;
  @Prop({ required: true }) criada_por_id: number;
  @Prop({ required: false }) aprovada_por_id: number;
}

export const TarefaSchema = SchemaFactory.createForClass(Tarefa);
