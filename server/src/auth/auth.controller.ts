import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ResponseObject } from 'src/models/response.model';
import { AuthResponse, RegisterBody, RegisterDTO } from 'src/models/user.models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ){}

  @Post('register')
  @ApiCreatedResponse({ description: '用户注册' })
  @ApiBody({ type: RegisterBody })
  async register(@Body('user',ValidationPipe) registerDTO:RegisterDTO):Promise<ResponseObject<'user',AuthResponse>> {
    const user = await this.authService.register(registerDTO)
    return {user}
  }
}
