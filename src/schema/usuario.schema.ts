import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: false }) nome: string;
  @Prop({ required: false }) email: string;
  @Prop({ required: false }) senha_hash: string;
  @Prop({ required: false }) foto_url: string;
  @Prop({ required: false }) papel: string;
  @Prop({ required: false }) ativo: boolean;
  @Prop({ required: false }) score: number;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
