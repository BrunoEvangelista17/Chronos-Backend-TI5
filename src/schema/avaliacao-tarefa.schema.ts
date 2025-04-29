import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvaliacaoTarefaDocument = AvaliacaoTarefa & Document;

@Schema()
export class AvaliacaoTarefa {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: false }) tarefa_id: number;
  @Prop({ required: false }) nota: number;
  @Prop({ required: false }) data_avaliacao: Date;
  @Prop({ required: false }) gerada_automaticamente: boolean;
}

export const AvaliacaoTarefaSchema =
  SchemaFactory.createForClass(AvaliacaoTarefa);
