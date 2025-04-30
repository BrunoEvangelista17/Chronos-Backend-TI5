import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsMongoId,
  IsNumber,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  data_inicio?: Date;

  @IsDateString()
  @IsOptional()
  data_limite?: Date;

  @IsDateString()
  @IsOptional()
  data_conclusao?: Date;

  @IsString()
  @IsOptional()
  prioridade?: string;

  @IsNumber()
  @IsOptional()
  complexidade?: number;

  @IsMongoId()
  projeto_id: string;

  @IsMongoId()
  criada_por_id: string;

  @IsMongoId()
  @IsOptional()
  aprovada_por_id?: string;
}
