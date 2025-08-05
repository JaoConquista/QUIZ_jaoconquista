import { Request, Response } from "express";
import { Quiz } from "models/Quiz";
import { QuizzesService } from "../service/quizzesService";

export class QuizzesController {
  constructor(private quizzesService: QuizzesService = new QuizzesService()) {}

  getAllQuizzes = async (req: Request, res: Response): Promise<void> => {
    try {
      const quizzes = await this.quizzesService.getAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  };

  getQuizById = async (req: Request, res: Response): Promise<void> => {
    const quizId = parseInt(req.params.id, 10);
    if (!quizId) {
      res.status(400).json({ message: "Invalid quiz ID" });
      return;
    }

    try {
      const quiz = await this.quizzesService.getQuizById(quizId);
      if (!quiz) {
        res.status(404).json({ message: "Quiz not found" });
      } else {
        res.json(quiz);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch quiz by ID" });
    }
  };

  createQuiz = async (req: Request, res: Response): Promise<void> => {
    try {
      const quizData: Partial<Quiz> = req.body;
      const quiz = await this.quizzesService.createQuiz(quizData);
      res.status(201).json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create quiz" });
    }
  };

  deleteQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = parseInt(req.params.id, 10);
    if (!quizId) {
      res.status(400).json({ message: "Invalid quiz ID" });
      return;
    }

    try {
      await this.quizzesService.deleteQuiz(quizId);
      res.status(204).send(`Quiz ${quizId} deleted successfully`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete quiz" });
    }
  };
}
