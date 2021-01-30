import { IsEmail, IsNumber, isNumber } from "class-validator";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { classToPlain, Exclude } from 'class-transformer'
import * as bcrypt from 'bcryptjs'
import { UserResponse } from "src/models/user.models";
@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsNumber()
  uid: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: null, nullable: true })
  avatarUrl: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(
    type => UserEntity,
    user => user.followee
  )
  @JoinTable()
  followers: UserEntity[];

  @ManyToMany(
    type => UserEntity,
    user => user.followers
  )
  followee: UserEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }


  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password)
  }

  toJSON() {
    return classToPlain(this)
  }

  toProfile(user?: UserEntity) {
    let following = null;
    if (user) {
      following = this.followers.includes(user)
    }
    const profile = this.toJSON()
    return {...profile,following}
  }
}