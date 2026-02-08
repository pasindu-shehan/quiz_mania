import React, { useEffect, useState } from "react";
import http from "../api/axiosInstance";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Quiz() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const allQuestions = await getQuestions();
        setQuestions(allQuestions);
      } catch (error) {
        toast.error(error.response?.data?.message);
        console.log(`LOGIN:${error.message}`);
      }
    };

    loadQuestions();

    // setQuestions(getQuestions());
  }, []);

  // const { difficulty, type, category, amount } = useSearchParams();
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const difficulty = searchParams.get("difficulty");

  async function getQuestions() {
    try {
      let navPath = `/quizSession?amount=${amount}`;
      if (category !== null) {
        navPath = navPath + `&category=${category}`;
      }
      if (type !== null) {
        navPath = navPath + `&type=${type}`;
      }
      if (difficulty !== null) {
        navPath = navPath + `&difficulty=${difficulty}`;
      }
      console.log(navPath);

      const AllQuestion = await http.get(navPath);
      return AllQuestion;
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(`LOGIN:${error.message}`);
    }
  }

  return <div>kkk</div>;
}
