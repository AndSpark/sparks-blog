import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator'

export class CreateArticleDTO {
  @IsString()
  @ApiProperty()
  title: string;
  
  @IsString()
  @ApiProperty()
    
  body: string;

  @IsString()
  @ApiProperty()
    
  description: string;

  @IsString()
  @ApiProperty()
    
  category: string;
}

export class UpdateArticleDTO {

  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  body: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  category: string;
}

