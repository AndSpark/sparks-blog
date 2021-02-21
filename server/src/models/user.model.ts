import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  email: string;

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
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;


  @ApiProperty()
  uid: number;
}

export class RegisterBody {
  @ApiProperty()
  user: RegisterDTO;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  bio: string;
}

export class UpdateUserBody {
  @ApiProperty()
  user: UpdateUserDTO;
}

export interface AuthPayload {
  username: string;
}

export interface UserResponse {
  user: {
    email: string;
    username?: string;
    bio: string;
    avatar: string | null;
    followersCount: number;
    followeeCount: number;
    articlesCount: number;
  }
  
}

export interface AuthResponse extends UserResponse {
  token: {
    token: string;
    expires: number;
  }
  
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}
