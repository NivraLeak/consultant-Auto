import {MigrationInterface, QueryRunner} from "typeorm";

export class authIntegrate1612576730187 implements MigrationInterface {
    name = 'authIntegrate1612576730187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c19ad3671f901796d5a7395e3e" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c19ad3671f901796d5a7395e3e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ownerId"`);
    }

}
