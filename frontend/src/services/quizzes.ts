import { IQuizz } from "@/interfaces/quizz";
import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export async function getQuizzes() {
  try {
    const response = await axios.get(`${baseUrl}/quizzes`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar quizzes:", error);
    throw error;
  }
}

export async function getQuizById(quizId: number) {
  try {
    const response = await axios.get(`${baseUrl}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar quizzes:", error);
    throw error;
  }
}

export async function createQuiz(quiz: IQuizz) {
  try {
    const response = await axios.post(`${baseUrl}/quizzes`, quiz);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar quizzes:", error);
    throw error;
  }
}

export async function deleteQuiz(quizId: number) {
  try {
    const response = await axios.delete(`${baseUrl}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar quizzes:", error);
    throw error;
  }
}
