import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSchedule1732671087277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.schedule (
                id integer NOT NULL,
                user_id integer NOT NULL,
                establishment_id integer NOT NULL,
                status_id integer NOT NULL,
                schedule_date timestamp NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );
            
            CREATE SEQUENCE public.schedule_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;
            ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.schedule;
        `);
    }

}
