import { AppDataSource } from './data-source';
import { populateDemoData } from './seed';

async function resetDemoDatabase() {
  await AppDataSource.initialize();

  await AppDataSource.query('DROP SCHEMA public CASCADE');
  await AppDataSource.query('CREATE SCHEMA public');
  await AppDataSource.query('GRANT ALL ON SCHEMA public TO public');
  await AppDataSource.query(
    `GRANT ALL ON SCHEMA public TO "${process.env.DB_USERNAME}"`,
  );

  await AppDataSource.destroy();
  await AppDataSource.initialize();

  await AppDataSource.runMigrations();
  await populateDemoData();
  await AppDataSource.destroy();

  console.log('db:demo-reset concluído (schema + migrations + seed).');
}

resetDemoDatabase().catch(async (error) => {
  console.error(error);
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(1);
});
