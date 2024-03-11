import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialData1710115998544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" (
            "id" SERIAL NOT NULL,
            "first_name" character varying NOT NULL,
            "last_name" character varying NOT NULL,
            "password" character varying NOT NULL,
            "email" character varying NOT NULL,
            "role" character varying NOT NULL,
            CONSTRAINT "PK_user" PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(`
       CREATE TABLE "loan_status" (
           "id" SERIAL NOT NULL,
           "name" character varying NOT NULL,
           CONSTRAINT "PK_loan_status" PRIMARY KEY ("id")
       )
   `);

    await queryRunner.query(`
       CREATE TABLE "loan_application" (
           "id" SERIAL NOT NULL,
           "user_id" integer,
           "amount_requested" numeric(10,2) NOT NULL,
           "submission_date" TIMESTAMP NOT NULL,
           CONSTRAINT "PK_loan_application" PRIMARY KEY ("id"),
           CONSTRAINT "FK_loan_application_user" FOREIGN KEY ("user_id") REFERENCES "user"("id")
       )
   `);

    await queryRunner.query(`
       CREATE TABLE "loan_application_status_change" (
           "id" SERIAL NOT NULL,
           "application_id" integer,
           "status_id" integer,
           "change_date" TIMESTAMP NOT NULL,
           "comments" text,
           CONSTRAINT "PK_loan_application_status_change" PRIMARY KEY ("id"),
           CONSTRAINT "FK_status_change_application" FOREIGN KEY ("application_id") REFERENCES "loan_application"("id"),
           CONSTRAINT "FK_status_change_status" FOREIGN KEY ("status_id") REFERENCES "loan_status"("id")
       )
   `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "loan_application_status_change"`);
    await queryRunner.query(`DROP TABLE "loan_application"`);
    await queryRunner.query(`DROP TABLE "loan_status"`);
  }
}
