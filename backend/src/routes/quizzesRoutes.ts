import Express, { Router as ExpressRouter } from "express";
import { QuizzesController } from "../controllers/quizzesController";
import { QuizzesService } from "../service/quizzesService";

const quizzesRoutes = ExpressRouter();
const quizzService = new QuizzesService();
const quizzesController = new QuizzesController(quizzService);

quizzesRoutes.get("/", quizzesController.getAllQuizzes);

quizzesRoutes.post("/", quizzesController.createQuiz);

quizzesRoutes.get("/:id", quizzesController.getQuizById);

quizzesRoutes.delete("/:id", quizzesController.deleteQuiz);

export default quizzesRoutes;
