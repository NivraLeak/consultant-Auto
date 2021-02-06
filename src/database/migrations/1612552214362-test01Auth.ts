import {MigrationInterface, QueryRunner} from "typeorm";

export class test01Auth1612552214362 implements MigrationInterface {
    name = 'test01Auth1612552214362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state_observation" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL DEFAULT 'registered', CONSTRAINT "PK_5369be8099f39183ef285feaff4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "observation" ("id" SERIAL NOT NULL, "detail" character varying(100) NOT NULL, "stateObservationId" integer, "carId" integer NOT NULL, "userCreatorId" uuid, "userResolveId" uuid, CONSTRAINT "PK_77a736edc631a400b788ce302cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "vim" character varying(45) NOT NULL, CONSTRAINT "UQ_8759558163515af82d61a2bbd7b" UNIQUE ("vim"), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_cad44c8b0b3c97648412ab067a6" FOREIGN KEY ("stateObservationId") REFERENCES "state_observation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_d7b0c09409f04d4c6dfe6ca9149" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_9e5e276e058a6b776d345ae7138" FOREIGN KEY ("userCreatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "observation" ADD CONSTRAINT "FK_34ab37511035c18988e093295a9" FOREIGN KEY ("userResolveId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_34ab37511035c18988e093295a9"`);
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_9e5e276e058a6b776d345ae7138"`);
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_d7b0c09409f04d4c6dfe6ca9149"`);
        await queryRunner.query(`ALTER TABLE "observation" DROP CONSTRAINT "FK_cad44c8b0b3c97648412ab067a6"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "observation"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "state_observation"`);
    }

}
