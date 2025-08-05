import express from "express";
import { initializeDB } from "./db/index";
import { IndexRouter } from "./routes/index";

const start = async () => {
  try {
    const app = express();
    await initializeDB();
    const router = new IndexRouter().initializeRoutes();

    const PORT = 8080;

    app.use(express.json());
    app.use("/api", router);

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

start();
