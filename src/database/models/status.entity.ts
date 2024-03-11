import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LoanApplicationStatusChange } from './loanApplicationStatusChange.entity';

@Entity({ name: 'loan_status' })
export class LoanStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(
    () => LoanApplicationStatusChange,
    (statusChange) => statusChange.status,
  )
  statusChanges: LoanApplicationStatusChange[];
}
