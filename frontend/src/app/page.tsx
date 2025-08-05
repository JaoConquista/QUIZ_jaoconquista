"use client";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className="font-sans min-h-screen p-8 flex flex-col items-center justify-center gap-24">
      <Typography color="primary">
        <h1 className="text-8xl font-bold mb-4">Welcome to Quiz App</h1>
      </Typography>
      <nav className="gap-6">
        <Link
          href="/quizzes"
          className="btn-primary border-none h-20 w-40 border-2 p-3.5 rounded-lg text-amber-200 hover:bg-amber-500 hover:text-black transition-colors transform duration-100"
        >
          View Quizzes
        </Link>
      </nav>
    </main>
  );
}
