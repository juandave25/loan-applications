import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LoanApplication } from './application.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @OneToMany(() => LoanApplication, (loanApplication) => loanApplication.user)
  loanApplications: LoanApplication[];
}
