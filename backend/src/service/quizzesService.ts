import { AppDataSource } from "../db/dataSource";
import { Quiz } from "../models/Quiz";

export class QuizzesService {
  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      const quizzes = await AppDataSource.getRepository(Quiz).find();
      return quizzes;
    } catch (error) {
      throw new Error("Failed to fetch quizzes");
    }
  }

  async getQuizById(id: number): Promise<Quiz | null> {
    try {
      const quiz = await AppDataSource.getRepository(Quiz).findOne({
        where: { id },
      });
      return quiz || null;
    } catch (error) {
      throw new Error("Failed to fetch quiz by ID");
    }
  }

  async createQuiz(quizData: Partial<Quiz>): Promise<Quiz> {
    try {
      const quizRepository = AppDataSource.getRepository(Quiz);
      const newQuiz = quizRepository.create(quizData);
      await quizRepository.save(newQuiz);
      return newQuiz;
    } catch (error) {
      console.error("Error creating quiz:", error);
      throw new Error("Failed to create quiz");
    }
  }

  async deleteQuiz(id: number): Promise<void> {
    try {
      const quizRepository = AppDataSource.getRepository(Quiz);
      const quiz = await quizRepository.findOne({ where: { id } });
      if (!quiz) {
        throw new Error("Quiz not found");
      }
      await quizRepository.remove(quiz);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      throw new Error("Failed to delete quiz");
    }
  }
}
