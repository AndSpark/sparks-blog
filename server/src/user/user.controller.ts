import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/auth/user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import {
  UpdateUserDTO,
  AuthResponse,
  UpdateUserBody,
} from 'src/models/user.model';
import { ResponseObject } from 'src/models/response.model';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Current user' })
  @ApiUnauthorizedResponse()
  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(
    @User() { uid }: UserEntity,
  ): Promise< AuthResponse> {
    return await this.authService.findCurrentUser(uid);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update current user' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: UpdateUserBody })
  @Put()
  @UseGuards(AuthGuard())
  async update(
    @User() { uid }: UserEntity,
    @Body('user', new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateUserDTO,
  ): Promise<AuthResponse> {
    return await this.authService.updateUser(uid, data);
  }
}
