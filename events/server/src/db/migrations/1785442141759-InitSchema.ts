import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1785442141759 implements MigrationInterface {
    name = 'InitSchema1785442141759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants" RENAME COLUMN "joinedAd" TO "joinedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants" RENAME COLUMN "joinedAt" TO "joinedAd"`);
    }

}
