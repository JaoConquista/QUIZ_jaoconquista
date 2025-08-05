"use client";
import QuizDetail from "@/app/components/QuizDetail";
import { useRouter } from "next/router";

export default function QuizDetailPage() {
  const router = useRouter();
  const param = router.query.id;
  return <QuizDetail quizId={param as string} />;
}
