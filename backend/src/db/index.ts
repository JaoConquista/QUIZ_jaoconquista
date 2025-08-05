import "reflect-metadata";
import { AppDataSource } from "./dataSource";

export const initializeDB = async () => {
  await AppDataSource.initialize();
  console.log("Database connected");
};
