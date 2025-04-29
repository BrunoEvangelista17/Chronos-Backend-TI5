import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RelacionamentoTarefaDocument = RelacionamentoTarefa & Document;

@Schema()
export class RelacionamentoTarefa {
  @Prop({ unique: true, required: true }) id: number;
  @Prop({ required: true }) tarefa_origem_id: number;
  @Prop({ required: true }) tarefa_relacionada_id: number;
}

export const RelacionamentoTarefaSchema =
  SchemaFactory.createForClass(RelacionamentoTarefa);
