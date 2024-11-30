import { ProductServiceEntity } from "src/product-service/entities/product-service.entity";
import { ScheduleEntity } from "src/schedule/entities/schedule.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('schedule_service')
export class ScheduleServiceEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'schedule_id', nullable: false})
    scheduleId: number;

    @Column({name: 'service_id', nullable: false})
    serviceId: number;

    @Column({name: 'quantity', nullable: false})
    quantity: number;

    @Column({name: 'total_price', nullable: false})
    totalPrice: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

    @ManyToOne(() => ScheduleEntity, (schedule: ScheduleEntity) => schedule.scheduleService, { eager: true })
    @JoinColumn({name:'schedule_id', referencedColumnName: 'id'})
    schedule?: ScheduleEntity;

    @OneToOne(() => ProductServiceEntity, (productService) => productService.scheduleService, {cascade: true})
    @JoinColumn({name:'service_id', referencedColumnName:'id'})
    productService: ProductServiceEntity;

    
}