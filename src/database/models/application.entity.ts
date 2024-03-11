import { LoanApplicationStatusChange } from './loanApplicationStatusChange.entity';
import { User } from './user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'loan_application' })
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'submission_date' })
  submissionDate: Date;

  @Column({
    name: 'amount_requested',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amountRequested: number;

  @ManyToOne(() => User, (user) => user.loanApplications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => LoanApplicationStatusChange,
    (statusChange) => statusChange.loanApplication,
  )
  statusChanges: LoanApplicationStatusChange[];
}
