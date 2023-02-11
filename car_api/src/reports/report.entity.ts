import {Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Report{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    price: number; 

    // @Column()
    // model: string;

    // @Column()
    // year: Date;
    
    // @Column()
    // mileage: number;
    
    // @Column()
    // longitude: number;
    
    // @Column()
    // latitude: number;
    
    // @Column()
    // approved: boolean;
}