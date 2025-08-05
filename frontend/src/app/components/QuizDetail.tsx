"use client";
import { IQuestion } from "@/interfaces/questions";
import { IQuizz } from "@/interfaces/quizz";
import { getQuizById } from "@/services/quizzes";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface QuizIdProps {
  quizId: string;
}

export default function QuizDetail({ quizId }: QuizIdProps) {
  const [quiz, setQuiz] = useState<IQuizz | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      setError(null);
      try {
        const response = await getQuizById(Number(quizId));
        if (!response) throw new Error("Failed to fetch quiz");
        setQuiz(response);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchQuiz();
  }, [quizId]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!quiz) return <Typography>No quiz found</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {quiz.title}
      </Typography>
      {quiz.questions.map((q: IQuestion) => (
        <Box
          key={q.id}
          mt={3}
          p={2}
          border="1px solid #ccc"
          borderRadius={2}
          bgcolor="background.paper"
        >
          <Typography variant="h6" gutterBottom>
            {q.text}
          </Typography>

          {q.type === "multiple_choice" && q.options && (
            <RadioGroup value={q.answer} aria-label={q.text} name={`q-${q.id}`}>
              {q.options.map((opt) => (
                <FormControlLabel
                  key={opt}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                  disabled
                />
              ))}
            </RadioGroup>
          )}

          {q.type === "boolean" && (
            <RadioGroup
              value={q.answer.toLowerCase()}
              aria-label={q.text}
              name={`q-${q.id}`}
            >
              {["true", "false"].map((val, index) => (
                <FormControlLabel
                  key={index}
                  value={val}
                  control={<Radio />}
                  label={val.charAt(0).toUpperCase() + val.slice(1)}
                  disabled
                />
              ))}
            </RadioGroup>
          )}

          {q.type === "short_answer" && (
            <TextField
              value={q.answer}
              variant="outlined"
              fullWidth
              InputProps={{ readOnly: true }}
              aria-label={`Answer for ${q.text}`}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
