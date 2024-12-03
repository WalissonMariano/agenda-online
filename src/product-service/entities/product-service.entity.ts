import { CategoryEntity } from "src/category/entities/category.entity";
import { ScheduleServiceEntity } from "src/schedule-service/entities/schedule-service.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'product_service'})
export class ProductServiceEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'time', nullable: false})
    time: string;

    @Column({name: 'price', nullable: false})
    price: number;

    @Column({name: 'image', nullable: false})
    image: string;

    @Column({name: 'category_id', nullable: false})
    categoryId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

    @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.productService, { eager: true })
    @JoinColumn({name:'category_id', referencedColumnName: 'id'})
    category: CategoryEntity;


}