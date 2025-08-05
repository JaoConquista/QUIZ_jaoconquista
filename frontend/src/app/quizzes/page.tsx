"use client";

import Add from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import QuizList from "../components/QuizList";

export default function QuizzesListPage() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Botão de adicionar */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        href="/quizzes/create"
      >
        Add Quiz
      </Button>

      {/* Lista de quizzes */}
      <QuizList />
    </div>
  );
}
