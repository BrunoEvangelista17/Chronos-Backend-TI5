import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificacaoDocument = Notificacao & Document;

@Schema()
export class Notificacao {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: true }) mensagem: string;
  @Prop({ required: true }) criada_em: Date;
  @Prop({ required: true }) criada_por_id: number;
  @Prop({ required: true }) tipo: string;
  @Prop({ required: true }) task_id: number;
  @Prop({ required: true }) project_id: number;
}

export const NotificacaoSchema = SchemaFactory.createForClass(Notificacao);
