import { AddressEntity } from '../../address/entities/address.entity';
import { ProfessionalEntity } from '../../professional/entities/professional.entity';
import { ScheduleEntity } from '../../schedule/entities/schedule.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'establishment' })
export class EstablishmentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => AddressEntity, (address) => address.establishment, {
    eager: true,
  })
  address?: AddressEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.establishment)
  schedule?: ScheduleEntity[];

  @OneToMany(
    () => ProfessionalEntity,
    (professional) => professional.establishment,
  )
  professionals?: ProfessionalEntity[];
}
