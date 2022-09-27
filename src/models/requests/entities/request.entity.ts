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
  public id?: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'username' })
  public username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'division',
  })
  public division: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'phone_number',
  })
  public phoneNumber: string;

  @Column({ type: 'int', nullable: false, name: 'request_type' })
  public requestType: number;

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
  public status?: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
  })
  public updatedAt?: Date;

  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  public deletedAt?: Date;
}
