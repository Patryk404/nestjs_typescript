import { Report } from 'src/reports/report.entity';
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
  } from 'typeorm';

// import {Exclude} from "class-transformer";

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    // @Exclude()
    password: string;

    @OneToMany(()=>Report,(report)=>report.user) // circullary dependency issue
    reports: Report[];
  
    // @AfterInsert()
    // logInsert() {
    //   console.log('Inserted User with id', this.id);
    // }
  
    // @AfterUpdate()
    // logUpdate() {
    //   console.log('Updated User with id', this.id);
    // }
  
    // @AfterRemove()
    // logRemove() {
    //   console.log('Removed User with id', this.id);
    // }
  }
  