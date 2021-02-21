import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { ProfileResponse } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findByUid(
    uid: string,
    user?: UserEntity,
  ): Promise<ProfileResponse> {
    
    return (
      await this.userRepo.findOne({
        where: { uid:Number(uid) },
        relations: ['followers'],
      })
    ).toProfile(user);
  }

  async followUser(
    currentUser: UserEntity,
    uid: string,
  ): Promise<ProfileResponse> {
    const user = await this.userRepo.findOne({
      where: { uid:Number(uid) },
      relations: ['followers'],
    });
    user.followers.push(currentUser);
    await user.save();
    return user.toProfile(currentUser);
  }

  async unfollowUser(
    currentUser: UserEntity,
    uid: string,
  ): Promise<ProfileResponse> {
    const user = await this.userRepo.findOne({
      where: { uid:Number(uid) },
      relations: ['followers'],
    });
    user.followers = user.followers.filter(
      follower => follower !== currentUser,
    );
    await user.save();
    return user.toProfile(currentUser);
  }
}
