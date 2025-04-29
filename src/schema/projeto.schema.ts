import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true }) nome: string;
  @Prop({ required: false }) descricao: string;
  @Prop({ required: true }) data_inicio: Date;
  @Prop({ required: false }) data_fim: Date;
  @Prop({ required: true }) status: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
