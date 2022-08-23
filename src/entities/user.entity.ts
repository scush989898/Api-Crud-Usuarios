import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  //

  @Column({ length: 90 })
  name: string;

  @Column({ unique: true, length: 60 })
  email: string;

  @Column({ length: 160 })
  password: string;

  @Column()
  age: number;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}

export { User };
