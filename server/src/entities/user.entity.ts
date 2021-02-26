import {
  Entity,
  Column,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  OneToMany,
  Unique,
  OneToOne,
  AfterLoad,
  AfterUpdate,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { AbstractEntity } from './abstract-entity';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { UserResponse } from 'src/models/user.model';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  uid: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;
  
  @Column({ default: null, nullable: true })
  avatar: string | null;

  @Column()
  @Exclude()
  password: string;

  
  @ManyToMany(
    type => UserEntity,
    user => user.followee,
  )
  @JoinTable()
  followers: UserEntity[];


  @ManyToMany(
    type => UserEntity,
    user => user.followers,
  )
  followee: UserEntity[];

  @OneToMany(
    type => ArticleEntity,
    article => article.author,
  )
  articles: ArticleEntity[];

  @OneToMany(
    type => CommentEntity,
    comment => comment.author,
    
  )
  comments: CommentEntity[];

  @ManyToMany(
    type => ArticleEntity,
    article => article.favoritedBy,
  )
  favorites: ArticleEntity[];

  @Column({default:0})
  followersCount: number;

  @Column({default:0})
  followeeCount: number;

  @Column({default:0})
  articlesCount: number;

  @Column({ default: 0 })
  articlesViewCount:number

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON(): UserResponse['user'] {

    return <UserResponse['user']>classToPlain(this);
  }

  toProfile(user?: UserEntity) {
    let following = null;
    if (user && user.followers) {
      following = this.followers.includes(user);
    }
    const profile: any = this.toJSON();
    delete profile.followers;
    return { ...profile, following };
  }
}
