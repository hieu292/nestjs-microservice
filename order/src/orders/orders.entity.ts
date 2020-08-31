import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';
import {OrderStatus} from "./order_status.enum";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  productId: number;

  @Column()
  status: OrderStatus;

  @Column()
  userId: number;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at',
  })
  updatedAt: Date;
}
