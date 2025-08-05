import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @CreateDateColumn()
  public createdAt: string;

  @OneToMany(() => Question, (question: Question) => question.quiz, {
    cascade: true,
    eager: true,
  })
  public questions: Question[];
}
