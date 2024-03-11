import { DataSource } from 'typeorm';
import { LoanApplicationStatusChange } from './models/loanApplicationStatusChange.entity';
import { LoanApplication } from './models/application.entity';
import { User } from './models/user.entity';
import { LoanStatus } from './models/status.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'loan_application',
  entities: [User, LoanApplication, LoanApplicationStatusChange, LoanStatus],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
});
