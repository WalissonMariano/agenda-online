import { EstablishmentEntity } from "src/establishment/entities/establishment.entity";
import { StatusEntity } from "src/status/entities/status.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ScheduleServiceEntity } from "src/schedule-service/entities/schedule-service.entity";

@Entity({name: 'schedule'})
export class ScheduleEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: number;

    @Column({name: 'establishment_id', nullable: false})
    establishmentId: number;

    @Column({name: 'status_id', nullable: false})
    statusId: number;

    @Column({name: 'schedule_date', nullable: false})
    scheduleDate: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.schedule, { eager: true })
    @JoinColumn({name:'user_id', referencedColumnName: 'id'})
    user?: UserEntity;

    @ManyToOne(() => EstablishmentEntity, (establishment: EstablishmentEntity) => establishment.schedule, { eager: true })
    @JoinColumn({name:'establishment_id', referencedColumnName: 'id'})
    establishment?: EstablishmentEntity;

    @ManyToOne(() => StatusEntity, (status: StatusEntity) => status.schedule, { eager: true })
    @JoinColumn({name:'status_id', referencedColumnName: 'id'})
    status?: StatusEntity;

    @OneToMany(() => ScheduleServiceEntity, (scheduleService: ScheduleServiceEntity) => scheduleService.schedule)
    scheduleService: ScheduleServiceEntity[];
}