import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TarefaUsuarioDocument = TarefaUsuario & Document;

@Schema()
export class TarefaUsuario {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: true }) tarefa_id: number;
  @Prop({ required: true }) usuario_id: number;
  @Prop({ required: false }) tempo_gastto_horas: number;
  @Prop({ required: false }) concluida_em: Date;
  @Prop({ required: true }) notificado_relacionada: boolean;
}

export const TarefaUsuarioSchema = SchemaFactory.createForClass(TarefaUsuario);
