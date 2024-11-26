import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAddress1732571531570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.address (
                id integer NOT NULL,
                establishment_id integer NOT NULL,
                street character varying,
                district character varying,
                number integer NOT NULL,
                cep character varying NOT NULL,
                city_id integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );
            
            CREATE SEQUENCE public.address_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;
            
            ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.address;
        `);
    }

}
