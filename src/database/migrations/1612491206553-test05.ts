import {MigrationInterface, QueryRunner} from "typeorm";

export class test051612491206553 implements MigrationInterface {
    name = 'test051612491206553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "observation" ("id" SERIAL NOT NULL, "detail" character varying NOT NULL, "stateObservationId" integer, "carId" integer, "userCreatorId" integer, "userResolveId" integer, CONSTRAINT "PK_77a736edc631a400b788ce302cb" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "observation"`);
    }

}
