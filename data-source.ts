import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['src/**/*.entity.{ts,js}'],
    migrations: ['src/migration/**/*.{ts,js}'],
    synchronize: false,
    migrationsRun: false,
  });

  //npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ./src/migration/CreateTypeUserTable -d ./data-source.ts
