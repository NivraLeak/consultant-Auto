import {MigrationInterface, QueryRunner} from "typeorm";

export class test02Auth1612572976868 implements MigrationInterface {
    name = 'test02Auth1612572976868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(45) NOT NULL`);
    }

}
