import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInitialAdminUser1760328100000 implements MigrationInterface {
  name = 'InsertInitialAdminUser1760328100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO public."user" (
        name,
        email,
        cpf,
        type_user,
        phone,
        password
      )
      SELECT
        'Administrador',
        'admin@agendaonline.com',
        '000.000.000-00',
        1,
        '(00) 000000000',
        '$2b$10$lhITtozAW6N63s9YkGhWzuItgKUhwKZtIDT9EZ.qan4/utugxv7O6'
      WHERE NOT EXISTS (
        SELECT 1 FROM public."user" WHERE email = 'admin@agendaonline.com'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public."user" WHERE email = 'admin@agendaonline.com';
    `);
  }
}
