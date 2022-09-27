import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'int', nullable: false, name: 'request_type' })
  public requestType: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'user_name' })
  public userName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'user_division',
  })
  public userDivision: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'user_phone_number',
  })
  public userPhoneNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'item_name',
  })
  public itemName: string;

  @Column({ type: 'text', nullable: false })
  public purpose: string;

  @Column({ type: 'int', nullable: false })
  public priority: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  public status: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
  })
  public updatedAt: Date;

  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  public deletedAt?: Date;
}
