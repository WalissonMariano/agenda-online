import { Address } from "src/address/entities/address.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'establishment'})
export class Establishment {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'phone', nullable: false})
    phone: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

    @OneToOne(() => Address, (address) => address.establishment, { eager: true })
    address: Address;

}