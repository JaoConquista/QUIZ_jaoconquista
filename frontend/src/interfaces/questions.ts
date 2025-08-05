import { QuestionEnum } from "../../enums/questionEnums";

export interface IQuestion {
  id?: number;
  text: string;
  type: QuestionEnum;
  answer: string;
  options?: string[] | null;
}
