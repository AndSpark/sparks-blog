import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  isEmail,
} from 'class-validator';

export class LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;


  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;
}

export class LoginBody {
  @ApiProperty()
  user: LoginDTO;
}

export class RegisterDTO extends LoginDTO {
  @IsEmail()
  @MinLength(4)
  @ApiProperty()
  email: string;
}

export class RegisterBody {
  @ApiProperty()
  user: RegisterDTO;
}

export class UpdateUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  username: string;

  @IsOptional()
  avatarUrl: string;
}

export class UpdateUserBody {
  @ApiProperty()
  user: UpdateUserDTO;
}

export interface AuthPayload {
  username: string;
}

export interface UserResponse {
  email: string;
  username: string;
  avatarUrl: string | null;
}

export interface AuthResponse extends UserResponse {
  token: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}
