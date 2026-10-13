import { hashSync } from 'bcrypt';
import { AppDataSource } from './data-source';
import { AddressEntity } from './address/entities/address.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { CityEntity } from './city/entities/city.entity';
import { EstablishmentEntity } from './establishment/entities/establishment.entity';
import { ProductServiceEntity } from './product-service/entities/product-service.entity';
import { ProfessionalEntity } from './professional/entities/professional.entity';
import { ScheduleServiceEntity } from './schedule-service/entities/schedule-service.entity';
import { ScheduleEntity } from './schedule/entities/schedule.entity';
import { UserEntity } from './user/entities/user.entity';
import { UserType } from './user/enum/user-type.enum';

const DEMO_PASSWORD_HASH = hashSync('Admin@123', 10);

export async function populateDemoData(): Promise<void> {
  const userRepository = AppDataSource.getRepository(UserEntity);
  const establishmentRepository =
    AppDataSource.getRepository(EstablishmentEntity);
  const addressRepository = AppDataSource.getRepository(AddressEntity);
  const categoryRepository = AppDataSource.getRepository(CategoryEntity);
  const productServiceRepository =
    AppDataSource.getRepository(ProductServiceEntity);
  const professionalRepository =
    AppDataSource.getRepository(ProfessionalEntity);
  const scheduleRepository = AppDataSource.getRepository(ScheduleEntity);
  const scheduleServiceRepository =
    AppDataSource.getRepository(ScheduleServiceEntity);
  const cityRepository = AppDataSource.getRepository(CityEntity);

  const city =
    (await cityRepository.findOne({ where: { name: 'Belo Horizonte' } })) ||
    (await cityRepository.findOne({ where: { name: 'Vitória' } })) ||
    (await cityRepository.findOne({ where: {} }));

  if (!city) {
    throw new Error(
      'Nenhuma cidade encontrada. Rode as migrations antes do seed.',
    );
  }

  const professionalUser = await userRepository.save({
    name: 'João Profissional',
    email: 'profissional@agendaonline.com',
    cpf: '111.111.111-11',
    phone: '(31) 98888-0001',
    password: DEMO_PASSWORD_HASH,
    typeUser: UserType.Professional,
  });

  const clientUser = await userRepository.save({
    name: 'Maria Cliente',
    email: 'cliente@agendaonline.com',
    cpf: '222.222.222-22',
    phone: '(31) 98888-0002',
    password: DEMO_PASSWORD_HASH,
    typeUser: UserType.User,
  });

  const establishment = await establishmentRepository.save({
    name: 'Barbearia Portfolio',
    phone: '(31) 3333-4444',
    email: 'contato@barbeariaportfolio.com',
  });

  await addressRepository.save({
    establishmentId: establishment.id,
    street: 'Rua da Barbearia',
    district: 'Centro',
    number: 100,
    cep: '30130-000',
    cityId: city.id,
  });

  const cutsCategory = await categoryRepository.save({
    name: 'Cortes',
    description: 'Serviços de corte e barba',
  });

  const productsCategory = await categoryRepository.save({
    name: 'Produtos',
    description: 'Produtos para cabelo e barba',
  });

  const haircut = await productServiceRepository.save({
    name: 'Corte masculino',
    time: '40 minutes',
    price: 45,
    image: 'corte-masculino.png',
    categoryId: cutsCategory.id,
  });

  const beard = await productServiceRepository.save({
    name: 'Barba',
    time: '30 minutes',
    price: 35,
    image: 'barba.png',
    categoryId: cutsCategory.id,
  });

  const pomade = await productServiceRepository.save({
    name: 'Pomada modeladora',
    time: '0 minutes',
    price: 29.9,
    image: 'pomada.png',
    categoryId: productsCategory.id,
  });

  const professional = await professionalRepository.save({
    userId: professionalUser.id,
    establishmentId: establishment.id,
  });

  const pendingSchedule = await scheduleRepository.save({
    userId: clientUser.id,
    establishmentId: establishment.id,
    professionalId: professional.id,
    statusId: 1,
    scheduleDate: new Date('2026-10-20T14:00:00.000Z'),
  });

  const confirmedSchedule = await scheduleRepository.save({
    userId: clientUser.id,
    establishmentId: establishment.id,
    professionalId: professional.id,
    statusId: 2,
    scheduleDate: new Date('2026-10-22T16:30:00.000Z'),
  });

  await scheduleServiceRepository.save([
    {
      scheduleId: pendingSchedule.id,
      serviceId: haircut.id,
      quantity: 1,
      totalPrice: Number(haircut.price) * 1,
    },
    {
      scheduleId: pendingSchedule.id,
      serviceId: beard.id,
      quantity: 1,
      totalPrice: Number(beard.price) * 1,
    },
    {
      scheduleId: confirmedSchedule.id,
      serviceId: haircut.id,
      quantity: 1,
      totalPrice: Number(haircut.price) * 1,
    },
    {
      scheduleId: confirmedSchedule.id,
      serviceId: pomade.id,
      quantity: 2,
      totalPrice: Number(pomade.price) * 2,
    },
  ]);

  console.log('Seed demo concluído.');
  console.log('Usuários demo (senha Admin@123):');
  console.log(' - profissional@agendaonline.com');
  console.log(' - cliente@agendaonline.com');
  console.log('Estabelecimento: Barbearia Portfolio');
}

async function seed() {
  await AppDataSource.initialize();
  await populateDemoData();
  await AppDataSource.destroy();
}

if (require.main === module) {
  seed().catch(async (error) => {
    console.error(error);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(1);
  });
}
