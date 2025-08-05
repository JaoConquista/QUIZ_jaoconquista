"use client";
import { IQuestion } from "@/interfaces/questions";
import { IQuizz } from "@/interfaces/quizz";
import { createQuiz } from "@/services/quizzes";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { QuestionEnum } from "../../../enums/questionEnums";

type QuestionType = "multiple_choice" | "boolean" | "short_answer";

export default function QuizForm() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([
    { type: QuestionEnum.BOOLEAN, text: "", answer: "true" },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: QuestionEnum.BOOLEAN, text: "", answer: "true" },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof IQuestion,
    value: unknown
  ) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };

    if (
      field === "type" &&
      value === "multiple_choice" &&
      !updated[index].options
    ) {
      updated[index].options = ["", ""];
      updated[index].answer = "";
    }
    if (field === "type" && value === "boolean") {
      delete updated[index].options;
      updated[index].answer = "true";
    }
    // Se mudar tipo para short_answer, remover options
    if (field === "type" && value === "short_answer") {
      delete updated[index].options;
      updated[index].answer = "";
    }

    setQuestions(updated);
  };

  const handleOptionChange = (
    qIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    if (!updated[qIndex].options) updated[qIndex].options = [];
    updated[qIndex].options![optionIndex] = value;
    setQuestions(updated);
  };

  const handleAddOption = (qIndex: number) => {
    const updated = [...questions];
    if (!updated[qIndex].options) updated[qIndex].options = [];
    updated[qIndex].options!.push("");
    setQuestions(updated);
  };

  const handleRemoveOption = (qIndex: number, optionIndex: number) => {
    const updated = [...questions];
    if (!updated[qIndex].options) return;
    updated[qIndex].options!.splice(optionIndex, 1);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    const payload: IQuizz = {
      title,
      questions: questions.map(({ text, type, options, answer }) => ({
        text,
        type,
        options: options && options.length > 0 ? options : null,
        answer,
      })),
    };

    try {
      await createQuiz(payload);
      window.location.href = "/quizzes";
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box style={{ margin: "2rem" }}>
      <Typography variant="h4" className="p-6">
        Create Quiz
      </Typography>
      <TextField
        label="Quiz Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, idx) => (
        <Box key={idx} mt={2} p={2} border="1px solid #ccc" borderRadius={2}>
          <TextField
            label={`Question ${idx + 1}`}
            fullWidth
            value={q.text}
            onChange={(e) => handleQuestionChange(idx, "text", e.target.value)}
          />

          <TextField
            select
            label="Type"
            value={q.type}
            onChange={(e) =>
              handleQuestionChange(idx, "type", e.target.value as QuestionType)
            }
            SelectProps={{ native: true }}
            sx={{ mt: 1, mb: 1 }}
          >
            <option value="boolean">Boolean (True/False)</option>
            <option value="multiple_choice">Multiple Choice</option>
            <option value="short_answer">Short Answer</option>
          </TextField>

          {q.type === "multiple_choice" && (
            <Box>
              <Typography variant="subtitle1">Options</Typography>
              {q.options?.map((opt, i) => (
                <Box key={i} display="flex" alignItems="center" mb={1}>
                  <TextField
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, i, e.target.value)}
                    fullWidth
                  />
                  <IconButton onClick={() => handleRemoveOption(idx, i)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                onClick={() => handleAddOption(idx)}
                variant="outlined"
                size="small"
              >
                Add Option
              </Button>
            </Box>
          )}

          {(q.type === "boolean" || q.type === "multiple_choice") && (
            <TextField
              label="Correct Answer"
              value={q.answer ?? ""}
              onChange={(e) =>
                handleQuestionChange(idx, "answer", e.target.value)
              }
              fullWidth
              margin="normal"
              helperText={
                q.type === "boolean"
                  ? 'Digite "true" ou "false"'
                  : "Digite a resposta correta exatamente como uma das opções"
              }
            />
          )}

          {q.type === "short_answer" && (
            <TextField
              label="Answer"
              value={q.answer ?? ""}
              onChange={(e) =>
                handleQuestionChange(idx, "answer", e.target.value)
              }
              fullWidth
              margin="normal"
            />
          )}

          <Button
            color="warning"
            onClick={() => handleRemoveQuestion(idx)}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Delete Question
          </Button>
        </Box>
      ))}

      <section className="flex justify-between px-10">
        <Button onClick={handleAddQuestion} variant="outlined" sx={{ mt: 2 }}>
          Add Question
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Submit Quiz
        </Button>
      </section>
    </Box>
  );
}
