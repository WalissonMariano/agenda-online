import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({name: 'professional'})
export class ProfessionalEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    user_id: number;

    @Column({name: 'establishment_id', nullable: false})
    establishment_id: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

}