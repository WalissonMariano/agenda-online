import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfessionalTable1746584850493 implements MigrationInterface {
    name = 'CreateProfessionalTable1746584850493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.professional (
                id integer NOT NULL,
                user_id integer NOT NULL,
                establishment_id integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );
            CREATE SEQUENCE public.professional_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.professional_id_seq OWNED BY public.professional.id;
            ALTER TABLE ONLY public.professional ALTER COLUMN id SET DEFAULT nextval('public.professional_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.professional;
        `);
    }

}
