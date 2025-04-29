import { IsString, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsDateString()
  data_inicio: string;

  @IsDateString()
  data_fim: string;

  @IsString()
  status: string;
}
