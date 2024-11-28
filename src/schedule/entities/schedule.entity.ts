import { Establishment } from "src/establishment/entities/establishment.entity";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'schedule'})
export class Schedule {
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

    @ManyToOne(() => User, (user: User) => user.schedule, { eager: true })
    @JoinColumn({name:'user_id', referencedColumnName: 'id'})
    user?: User;

    @ManyToOne(() => Establishment, (establishment: Establishment) => establishment.schedule, { eager: true })
    @JoinColumn({name:'establishment_id', referencedColumnName: 'id'})
    establishment?: Establishment;

    @ManyToOne(() => Status, (status: Status) => status.schedule, { eager: true })
    @JoinColumn({name:'status_id', referencedColumnName: 'id'})
    status?: Status;
}