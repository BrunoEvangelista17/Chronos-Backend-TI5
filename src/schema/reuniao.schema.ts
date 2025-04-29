import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReuniaoDocument = Reuniao & Document;

@Schema()
export class Reuniao {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: true }) project_id: number;
  @Prop({ required: true }) data: Date;
  @Prop({ required: true }) tipo: string;
  @Prop({ required: false }) descricao: string;
}

export const ReuniaoSchema = SchemaFactory.createForClass(Reuniao);
