import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificacaoUsuarioDocument = NotificacaoUsuario & Document;

@Schema()
export class NotificacaoUsuario {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: true }) notificacao_id: number;
  @Prop({ required: true }) usuario_id: number;
  @Prop({ required: false }) visualizada_em: Date;
}

export const NotificacaoUsuarioSchema =
  SchemaFactory.createForClass(NotificacaoUsuario);
