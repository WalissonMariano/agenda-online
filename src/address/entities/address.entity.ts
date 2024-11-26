import { City } from "src/city/entities/city.entity";
import { Establishment } from "src/establishment/entities/establishment.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'address'})
export class Address {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'establishment_id', nullable: false})
    establishmentId: number;

    @Column({name: 'street', nullable: false})
    street: string;

    @Column({name: 'district', nullable: false})
    district: string;

    @Column({name: 'number', nullable: false})
    number: number;

    @Column({name: 'cep', nullable: false})
    cep: string;

    @Column({name: 'city_id', nullable: false})
    cityId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

    @ManyToOne(() => City, (city: City) => city.address, { eager: true })
    @JoinColumn({name:'city_id', referencedColumnName: 'id'})
    city?: City;

    @OneToOne(() => Establishment, (establishment) => establishment.address, {cascade: true})
    @JoinColumn({name:'establishment_id', referencedColumnName:'id'})
    establishment: Establishment;

}