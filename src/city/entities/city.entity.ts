import { AddressEntity } from "src/address/entities/address.entity";
import { StateEntity } from "src/state/entities/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'city'})
export class CityEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'state_id', nullable: false})
    stateId: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateAt: Date;

    @ManyToOne(() => StateEntity, (state: StateEntity) => state.cities, { eager: true })
    @JoinColumn({name:'state_id', referencedColumnName: 'id'})
    state?: StateEntity;

    @OneToMany(() => AddressEntity, (address: AddressEntity) => address.city)
    address: AddressEntity[];

}