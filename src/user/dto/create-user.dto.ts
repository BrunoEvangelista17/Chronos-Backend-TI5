import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha_hash: string;

  @IsOptional()
  @IsString()
  foto_url?: string;

  @IsString()
  @IsNotEmpty()
  papel: string; // Ex: 'Scrum Master', 'PO', 'Dev'

  @IsBoolean()
  ativo: boolean;

  @IsNumber()
  @IsOptional()
  score?: number;
}
