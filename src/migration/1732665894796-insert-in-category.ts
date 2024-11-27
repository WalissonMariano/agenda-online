import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInCategory1732665894796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO category("id", "name", "description") VALUES (1, 'Product', 'Product');
            INSERT INTO category("id", "name", "description") VALUES (2, 'Service', 'Service');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM public.category;
        `);
    }

}
