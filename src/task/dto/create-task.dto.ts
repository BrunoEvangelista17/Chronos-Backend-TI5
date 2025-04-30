import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsNotEmpty()
  prioridade: string;

  @IsNumber()
  @IsNotEmpty()
  complexidade: number;

  @IsMongoId()
  @IsNotEmpty()
  projeto: string;

  @IsMongoId()
  @IsNotEmpty()
  criadaPor: string;

  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @IsDateString()
  @IsOptional()
  dataLimite?: string;

  @IsMongoId()
  @IsOptional()
  aprovadaPor?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  atribuicoes?: string[];
}
