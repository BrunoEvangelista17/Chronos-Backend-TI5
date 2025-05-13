import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProjectUserDto {
  @IsString()
  id: string;

  @IsString()
  nome: string;

  @IsString()
  email: string;

  @IsString()
  papel: string;
}

class ProjectTaskDto {
  @IsString()
  id: string;

  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsString()
  status: string;

  @IsString()
  dataInicio: string;

  @IsString()
  dataLimite: string;

  @IsOptional()
  complexidade?: number;
}

export class CreateProjectDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsString()
  dataInicio: string;

  @IsString()
  data_fim: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectUserDto)
  users?: ProjectUserDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectTaskDto)
  tasks?: ProjectTaskDto[];
}
