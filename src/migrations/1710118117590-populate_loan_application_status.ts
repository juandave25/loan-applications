import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateLoanApplicationStatus1710118117590
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "loan_status" VALUES ('Submitted');`);
    await queryRunner.query(
      `INSERT INTO "loan_status" VALUES ('Under Review');`,
    );
    await queryRunner.query(`INSERT INTO "loan_status" VALUES ('Approved');`);
    await queryRunner.query(`INSERT INTO "loan_status" VALUES ('Rejected');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM loan_status`);
  }
}
