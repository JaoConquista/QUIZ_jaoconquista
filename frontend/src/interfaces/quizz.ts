import { IQuestion } from "./questions";

export interface IQuizz {
  id?: number; // pode ser opcional na criação
  title: string;
  createdAt?: string; // timestamp ISO, opcional
  questions: IQuestion[];
}
