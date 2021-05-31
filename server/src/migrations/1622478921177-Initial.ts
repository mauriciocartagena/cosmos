import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1622478921177 implements MigrationInterface {
  name = "Initial1622478921177";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "creatorId" integer NOT NULL, "subtitle" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying, "url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "peopleId" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, "url" character varying, "email" character varying NOT NULL, "creatorId" integer NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_b40ff13132b995b758b1187ee8a" PRIMARY KEY ("creatorId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "people" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "first_last_name" character varying NOT NULL, "second_last_name" character varying, "phone" character varying, "direction" character varying, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "partner" ("creatorId" integer NOT NULL, CONSTRAINT "PK_f838070d853572b8b8bf7844be8" PRIMARY KEY ("creatorId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b40ff13132b995b758b1187ee8a" FOREIGN KEY ("creatorId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "partner" ADD CONSTRAINT "FK_f838070d853572b8b8bf7844be8" FOREIGN KEY ("creatorId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "partner" DROP CONSTRAINT "FK_f838070d853572b8b8bf7844be8"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_b40ff13132b995b758b1187ee8a"`
    );
    await queryRunner.query(`DROP TABLE "partner"`);
    await queryRunner.query(`DROP TABLE "people"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "post"`);
  }
}
