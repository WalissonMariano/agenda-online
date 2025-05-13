import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInTypeUser1746586226678 implements MigrationInterface {
    name = 'InsertInTypeUser1746586226678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public.type_user (
                id,
                name
            ) VALUES (
                1,
                'Administrador'
            );

            INSERT INTO public.type_user (
                id,
                name
            ) VALUES (
                2,
                'Administrador Estabelecimento'
            );

            INSERT INTO public.type_user (
                id,
                name
            ) VALUES (
                3,
                'Profissional'
            );

            INSERT INTO public.type_user (
                id,
                name
            ) VALUES (
                4,
                'Usuario'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            
        `);
    }

}
