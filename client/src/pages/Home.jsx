import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();

  return (
    <div>
      Home
      <button
        onClick={() => {
          nav("start_quiz");
        }}
      >
        START QUIZ
      </button>
    </div>
  );
}

export default Home;
