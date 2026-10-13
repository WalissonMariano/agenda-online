import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlignSchemaAndProfessionalOnSchedule1760328000000
  implements MigrationInterface
{
  name = 'AlignSchemaAndProfessionalOnSchedule1760328000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product_service"
      ALTER COLUMN "time" TYPE character varying USING "time"::text
    `);

    await queryRunner.query(`
      ALTER TABLE "schedule"
      ADD COLUMN IF NOT EXISTS "professional_id" integer
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_user_type_user'
        ) THEN
          ALTER TABLE "user"
          ADD CONSTRAINT "FK_user_type_user"
          FOREIGN KEY ("type_user") REFERENCES "type_user"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_address_city'
        ) THEN
          ALTER TABLE "address"
          ADD CONSTRAINT "FK_address_city"
          FOREIGN KEY ("city_id") REFERENCES "city"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_address_establishment'
        ) THEN
          ALTER TABLE "address"
          ADD CONSTRAINT "FK_address_establishment"
          FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_product_service_category'
        ) THEN
          ALTER TABLE "product_service"
          ADD CONSTRAINT "FK_product_service_category"
          FOREIGN KEY ("category_id") REFERENCES "category"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_professional_user'
        ) THEN
          ALTER TABLE "professional"
          ADD CONSTRAINT "FK_professional_user"
          FOREIGN KEY ("user_id") REFERENCES "user"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_professional_establishment'
        ) THEN
          ALTER TABLE "professional"
          ADD CONSTRAINT "FK_professional_establishment"
          FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_schedule_user'
        ) THEN
          ALTER TABLE "schedule"
          ADD CONSTRAINT "FK_schedule_user"
          FOREIGN KEY ("user_id") REFERENCES "user"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_schedule_establishment'
        ) THEN
          ALTER TABLE "schedule"
          ADD CONSTRAINT "FK_schedule_establishment"
          FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_schedule_status'
        ) THEN
          ALTER TABLE "schedule"
          ADD CONSTRAINT "FK_schedule_status"
          FOREIGN KEY ("status_id") REFERENCES "status"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_schedule_professional'
        ) THEN
          ALTER TABLE "schedule"
          ADD CONSTRAINT "FK_schedule_professional"
          FOREIGN KEY ("professional_id") REFERENCES "professional"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_schedule_service_schedule'
        ) THEN
          ALTER TABLE "schedule_service"
          ADD CONSTRAINT "FK_schedule_service_schedule"
          FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_schedule_service_product'
        ) THEN
          ALTER TABLE "schedule_service"
          ADD CONSTRAINT "FK_schedule_service_product"
          FOREIGN KEY ("service_id") REFERENCES "product_service"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule_service" DROP CONSTRAINT IF EXISTS "FK_schedule_service_product"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_service" DROP CONSTRAINT IF EXISTS "FK_schedule_service_schedule"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT IF EXISTS "FK_schedule_professional"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT IF EXISTS "FK_schedule_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT IF EXISTS "FK_schedule_establishment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT IF EXISTS "FK_schedule_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "professional" DROP CONSTRAINT IF EXISTS "FK_professional_establishment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "professional" DROP CONSTRAINT IF EXISTS "FK_professional_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_service" DROP CONSTRAINT IF EXISTS "FK_product_service_category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT IF EXISTS "FK_address_establishment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT IF EXISTS "FK_address_city"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_user_type_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP COLUMN IF EXISTS "professional_id"`,
    );
  }
}
