import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateLoanApplicationStatus1710118117590
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "loan_status" VALUES (1,'Submitted');`,
    );
    await queryRunner.query(
      `INSERT INTO "loan_status" VALUES (2,'Under Review');`,
    );
    await queryRunner.query(`INSERT INTO "loan_status" VALUES (3,'Approved');`);
    await queryRunner.query(`INSERT INTO "loan_status" VALUES (4,'Rejected');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM loan_status`);
  }
}
