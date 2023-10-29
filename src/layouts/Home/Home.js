import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import Space1Letter from "../../components/Space1Letter/Space1Letter";
import { ctx } from "../../CtxData";

export default function Home() {
  const nav = useNavigate()
  const ctxDt = useContext(ctx)
  const [examCode, SetExamCode] = useState(``); // State for exam code
  const [username, SetUsername] = useState(``); // State for username

  useEffect(() => {
    console.log("Reset");
    SetExamCode("");
    SetUsername("");
  }, []);

  const joinQuiz = () => {
    if (examCode && username) {
      ctxDt.SetExamCode(examCode)
      ctxDt.SetUser(username)
      nav(`/quiz/${examCode}`);
    }
  };

  return (
    <div className="join_hub">
      <p>
        This is a quiz website built with <code>React</code> you can try.
      </p>
      <div className="wrapper join_quiz">
        <input
          type="text"
          id="exam_code"
          placeholder="Enter quiz code"
          value={examCode}
          onChange={(e) => SetExamCode(e.target.value)}
        />
        <input
          type="text"
          id="user"
          placeholder="Enter username"
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
        />
        <button id="join_button" onClick={joinQuiz}>
          Join quiz <Space1Letter />
          <i class="fa-sharp fa-regular fa-check"></i>
        </button>
      </div>
    </div>
  );
}
