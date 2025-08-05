import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustOnQuestionTable1754362308509 implements MigrationInterface {
  name = "AdjustOnQuestionTable1754362308509";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."question_type_enum" AS ENUM('multiple_choice', 'boolean', 'short_answer')`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "type" "public"."question_type_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "question" ADD "options" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "answer" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "answer" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "options"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
  }
}
