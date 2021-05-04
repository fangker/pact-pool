import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Block {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, type: 'json' })
  data: object;

  @Column({ default: '' })
  sign: string;

  @Column({ default: '' })
  avgSpeed: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;
}
