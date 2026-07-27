import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1785192708814 implements MigrationInterface {
    name = 'InitSchema1785192708814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" RENAME COLUMN "staretedAt" TO "startedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" RENAME COLUMN "startedAt" TO "staretedAt"`);
    }

}
