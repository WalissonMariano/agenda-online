import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInTypeUser1746586226678 implements MigrationInterface {
    name = 'InsertInTypeUser1746586226678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public.type_user (
                name
            ) VALUES (
                'Administrador'
            );

            INSERT INTO public.type_user (
                name
            ) VALUES (
                'Administrador Estabelecimento'
            );

            INSERT INTO public.type_user (
                name
            ) VALUES (
                'Profissional'
            );

            INSERT INTO public.type_user (
                name
            ) VALUES (
                'Usuario'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            
        `);
    }

}
