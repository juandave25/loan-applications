import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LoanApplication } from './application.entity';
import { LoanStatus } from './status.entity';

@Entity({ name: 'loan_application_status_change' })
export class LoanApplicationStatusChange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'change_date' })
  changeDate: Date;

  @Column()
  comments: string;

  @ManyToOne(
    () => LoanApplication,
    (loanApplication) => loanApplication.statusChanges,
  )
  @JoinColumn({ name: 'application_id' })
  loanApplication: LoanApplication;

  @ManyToOne(() => LoanStatus, (loanStatus) => loanStatus.statusChanges)
  @JoinColumn({ name: 'status_id' })
  status: LoanStatus;
}
