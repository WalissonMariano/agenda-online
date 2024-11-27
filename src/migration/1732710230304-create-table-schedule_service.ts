import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableScheduleService1732710230304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.schedule_service (
                id integer NOT NULL,
                schedule_id integer NOT NULL,
                service_id integer NOT NULL,
                quantity integer NOT NULL,
                total_price double precision NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );
            CREATE SEQUENCE public.schedule_service_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.schedule_service_id_seq OWNED BY public.schedule_service.id;
            ALTER TABLE ONLY public.schedule_service ALTER COLUMN id SET DEFAULT nextval('public.schedule_service_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.schedule_service;
        `);
    }

}
