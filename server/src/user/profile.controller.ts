import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { OptionalAuthGuard } from 'src/auth/optional-auth.gaurd';
import { UserService } from './user.service';
import { ResponseObject } from 'src/models/response.model';
import { ProfileResponse } from 'src/models/user.model';

@Controller('profiles')
export class ProfileController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ description: 'Find user profile' })
  @Get('/:uid')
  @UseGuards(new OptionalAuthGuard())
  async findProfile(
    @Param('uid') uid: string,
    @User() user: UserEntity,
  ): Promise<ResponseObject<'profile', ProfileResponse>> {
    const profile = await this.userService.findByUid(uid, user);
    if (!profile) {
      throw new NotFoundException();
    }
    return {  profile};
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Follow user' })
  @ApiUnauthorizedResponse()
  @Post('/:uid/follow')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async followUser(
    @User() user: UserEntity,
    @Param('uid') uid: string,
  ): Promise<ResponseObject<'profile', ProfileResponse>> {
    const profile = await this.userService.followUser(user, uid);
    return { profile };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Unfollow user' })
  @ApiUnauthorizedResponse()
  @Delete('/:uid/follow')
  @UseGuards(AuthGuard())
  async unfollowUser(
    @User() user: UserEntity,
    @Param('uid') uid: string,
  ): Promise<ResponseObject<'profile', ProfileResponse>> {
    const profile = await this.userService.unfollowUser(user, uid);
    return { profile };
  }
}
