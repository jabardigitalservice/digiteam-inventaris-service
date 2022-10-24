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

  @Column({ type: 'varchar', length: 255, nullable: false })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public division: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public phone_number: string;

  @Column({ type: 'int', nullable: false })
  public request_type: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public requested_item: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public item_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public item_brand?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public item_number?: string;

  @Column({ type: 'text', nullable: false })
  public purpose: string;

  @Column({ type: 'int', nullable: false })
  public priority: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  public status?: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  public created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  public updated_at?: Date;

  @Column({ type: 'timestamp', nullable: true })
  public deleted_at?: Date;
}
