import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import {
  LoginDTO,
  RegisterDTO,
  UpdateUserDTO,
  AuthResponse,
} from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO): Promise<AuthResponse> {
    const u1 = await this.userRepo.findOne({ where: { username: credentials.username } })
    const u2 = await this.userRepo.findOne({ where: { email: credentials.email } })
    if (u1 || u2) {
      throw new ConflictException('Username or Email has already been taken')
    }
    const count = await this.userRepo.count()
    credentials.uid = count + 1
    Object.assign(credentials, {
      bio: '开始你的历程',
      avatar: 'https://picsum.photos/200',
    })
    const user = this.userRepo.create(credentials);
    await user.save();
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    
    return {
      user: user.toJSON(),
      token: {
        token,
        expires: new Date().getTime() + 604800000
      }
    };
  }

  async login({ email, password }: LoginDTO): Promise<AuthResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('邮箱或密码错误');
      }
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return {
        user: user.toJSON(),
        token: {
          token,
          expires: new Date().getTime() + 604800000
        }
      }
    } catch (error) {
      throw new UnauthorizedException('邮箱或密码错误');
    }
      
    
  }

  async findCurrentUser(uid: number): Promise<AuthResponse> {
    const user = await this.userRepo.findOne({ where: { uid:Number(uid) } });
    const payload = { username:user.username };
    const token = this.jwtService.sign(payload);
    return {
      user: user.toJSON(),
      token: {
        token,
        expires: new Date().getTime() + 604800000
      }
    }
  }

  async updateUser(
    uid: number,
    data: UpdateUserDTO,
  ): Promise<AuthResponse> {
    await this.userRepo.update({ uid:Number(uid) }, data);
    const user = await this.userRepo.findOne({ where: { uid:Number(uid) } });
    const payload = { username:user.username };
    const token = this.jwtService.sign(payload);
    return {
      user: user.toJSON(),
      token: {
        token,
        expires: new Date().getTime() + 604800000
      }
    }
  }
}
