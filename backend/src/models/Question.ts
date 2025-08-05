import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Quiz } from "./Quiz";

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  BOOLEAN = "boolean",
  SHORT_ANSWER = "short_answer",
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;

  @Column({ type: "enum", enum: QuestionType })
  public type: QuestionType;

  @Column({ nullable: true })
  public answer?: string;

  @Column({ type: "jsonb", nullable: true })
  public options?: string[];

  @CreateDateColumn()
  public createdAt: string;

  @ManyToOne(() => Quiz, (quiz: Quiz) => quiz.questions, {
    onDelete: "CASCADE",
  })
  public quiz: Quiz;
}
