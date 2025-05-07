import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({name: 'type_user'})
export class TypeUserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

}