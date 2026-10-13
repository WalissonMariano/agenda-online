import { ProductServiceEntity } from '../../product-service/entities/product-service.entity';
import { ScheduleEntity } from '../../schedule/entities/schedule.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'schedule_service' })
export class ScheduleServiceEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'schedule_id', nullable: false })
  scheduleId: number;

  @Column({ name: 'service_id', nullable: false })
  serviceId: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({
    name: 'total_price',
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.scheduleService, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'schedule_id', referencedColumnName: 'id' })
  schedule?: ScheduleEntity;

  @ManyToOne(
    () => ProductServiceEntity,
    (productService) => productService.scheduleServices,
    { eager: true },
  )
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  productService?: ProductServiceEntity;
}
