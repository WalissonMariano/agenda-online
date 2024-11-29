import { ProductServiceEntity } from "src/product-service/entities/product-service.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'category'})
export class CategoryEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'description', nullable: false})
    description: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateddAt: Date;

    @OneToMany(() => ProductServiceEntity, (productService: ProductServiceEntity) => productService.category)
    productService: ProductServiceEntity[];
}