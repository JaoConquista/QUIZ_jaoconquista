import { Router as ExpressRouter } from "express";
import quizzesRoutes from "./quizzesRoutes";

export class IndexRouter {
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = ExpressRouter();

    router.get("/ping", (req, res) => {
      res.send("pong");
    });

    router.use("/quizzes", quizzesRoutes);

    return router;
  }
}
