import { IQuizz } from "@/interfaces/quizz";
import { deleteQuiz, getQuizzes } from "@/services/quizzes";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<IQuizz[]>([]);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await getQuizzes();
        setQuizzes(res);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuizzes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      throw error;
    }
  };
  if (quizzes.length === 0) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        No quizzes available.
      </Typography>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" mb={3} align="center">
        Quizzes
      </Typography>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <div key={quiz.id}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom noWrap>
                  {quiz.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {quiz.questions.length} question
                  {quiz.questions.length !== 1 ? "s" : ""}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created at:{" "}
                  {new Date(quiz.createdAt ?? "").toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 1 }}
              >
                <Link
                  href={`/quizzes/${quiz.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: "bold",
                    flexGrow: 1,
                  }}
                >
                  View Details
                </Link>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(quiz.id!)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </Grid>
    </Box>
  );
}
