import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';
import { Types } from 'mongoose'
import { Exclude, Expose } from 'class-transformer';


export abstract class AbstractEntity extends BaseEntity {

  @ObjectIdColumn()
  @Exclude()
  _id: ObjectID;

  @Expose()
  get id() { 
    return (this._id) .toString();
  }

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  
}
