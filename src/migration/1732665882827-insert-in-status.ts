import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInStatus1732665882827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO status("id", "name", "description") VALUES (1, 'Pending', 'Pending');
            INSERT INTO status("id", "name", "description") VALUES (2, 'Confirmed', 'Confirmed');
            INSERT INTO status("id", "name", "description") VALUES (3, 'Cancelled', 'Cancelled');
            INSERT INTO status("id", "name", "description") VALUES (4, 'In Progress', 'In Progress');
            INSERT INTO status("id", "name", "description") VALUES (5, 'Completed', 'Completed');
            INSERT INTO status("id", "name", "description") VALUES (6, 'No Show', 'No Show');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM public.status;
        `);
    }

}
