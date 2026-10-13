import { EstablishmentEntity } from '../../establishment/entities/establishment.entity';
import { ScheduleEntity } from '../../schedule/entities/schedule.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'professional' })
export class ProfessionalEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'establishment_id', nullable: false })
  establishmentId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.professionals, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToOne(
    () => EstablishmentEntity,
    (establishment) => establishment.professionals,
    { eager: true },
  )
  @JoinColumn({ name: 'establishment_id', referencedColumnName: 'id' })
  establishment?: EstablishmentEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.professional)
  schedules?: ScheduleEntity[];
}
