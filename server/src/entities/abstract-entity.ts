import { BaseEntity, CreateDateColumn, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";


export abstract class AbstractEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}