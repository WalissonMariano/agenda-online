import { EstablishmentEntity } from '../../establishment/entities/establishment.entity';
import { ProfessionalEntity } from '../../professional/entities/professional.entity';
import { ScheduleServiceEntity } from '../../schedule-service/entities/schedule-service.entity';
import { StatusEntity } from '../../status/entities/status.entity';
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

@Entity({ name: 'schedule' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'establishment_id', nullable: false })
  establishmentId: number;

  @Column({ name: 'professional_id', nullable: false })
  professionalId: number;

  @Column({ name: 'status_id', nullable: false })
  statusId: number;

  @Column({ name: 'schedule_date', nullable: false })
  scheduleDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.schedule, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @ManyToOne(
    () => EstablishmentEntity,
    (establishment) => establishment.schedule,
    { eager: true },
  )
  @JoinColumn({ name: 'establishment_id', referencedColumnName: 'id' })
  establishment?: EstablishmentEntity;

  @ManyToOne(() => ProfessionalEntity, (professional) => professional.schedules, {
    eager: true,
  })
  @JoinColumn({ name: 'professional_id', referencedColumnName: 'id' })
  professional?: ProfessionalEntity;

  @ManyToOne(() => StatusEntity, (status) => status.schedule, { eager: true })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status?: StatusEntity;

  @OneToMany(
    () => ScheduleServiceEntity,
    (scheduleService) => scheduleService.schedule,
    { cascade: true, eager: true },
  )
  scheduleService?: ScheduleServiceEntity[];
}
