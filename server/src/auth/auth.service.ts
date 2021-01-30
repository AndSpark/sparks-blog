import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthResponse, RegisterDTO } from 'src/models/user.models';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
  ,  private jwtService: JwtService
  ) { }
  
  async register(registerDTO: RegisterDTO):Promise<AuthResponse> {
    try {
      const user = this.userRepo.create(registerDTO)
      await this.userRepo.save(user)
      const payload = { username: user.username }
      const token = this.jwtService.sign(payload)
      return {...user,token}
    } catch (err) {
      console.log(err);
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }
}
