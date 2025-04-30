import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvaliacaoTaskDocument = AvaliacaoTask & Document;

@Schema()
export class AvaliacaoTask {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: false }) task_id: number;
  @Prop({ required: false }) nota: number;
  @Prop({ required: false }) data_avaliacao: Date;
  @Prop({ required: false }) gerada_automaticamente: boolean;
}

export const AvaliacaoTaskSchema = SchemaFactory.createForClass(AvaliacaoTask);
