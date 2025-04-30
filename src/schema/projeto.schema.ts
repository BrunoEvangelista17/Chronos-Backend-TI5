import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;
@Schema()
export class Project extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop()
  descricao: string;

  @Prop({ type: Date })
  data_inicio: Date;

  @Prop({ type: Date })
  data_fim: Date;

  @Prop({ default: 'ativo' })
  status: string;

  @Prop({
    type: [
      {
        id: String,
        nome: String,
        email: String,
        papel: String,
      },
    ],
    default: [],
  })
  users: {
    id: string;
    nome: string;
    email: string;
    papel: string;
  }[];

  @Prop({
    type: [
      {
        id: String,
        titulo: String,
        descricao: String,
        status: String,
        data_inicio: Date,
        data_limite: Date,
        complexidade: Number,
      },
    ],
    default: [],
  })
  tasks: {
    id: string;
    titulo: string;
    descricao: string;
    status: string;
    data_inicio: Date;
    data_limite: Date;
    complexidade: number;
  }[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
