import React, { useContext, useEffect, useState } from "react";
import Timer from "../../components/Timer/Timer";
import "./QuizScreen.scss";
import { ctx } from "../../CtxData";
import Quiz from "../../components/Quiz/Quiz";

export default function QuizScreen() {
  const [state, setState] = useState(0);
  const [data, setData] = useState({});
  const ctxDt = useContext(ctx);
  const [currentQuiz, setCurrentQuiz] = useState("");
  const [qNo, setQNo] = useState(1);

  useEffect(() => {
    let id = ctxDt.examCode;
    fetch(`https://server.nglearns.com/quizz/${id}`)
      .then((res) => res.json())
      .then((dt) => {
        setData(dt);
        console.log(dt);
        setState(state + 1);
      });
  }, [ctxDt.examCode]);

  useEffect(() => {
    if (state === 1 && data && data.lsQuizz) {
      const newCurrentQuiz = Object.keys(data.lsQuizz)[qNo - 1];
      setCurrentQuiz(newCurrentQuiz);
    }
  }, [state, data, qNo]);

  useEffect(() => {
    // Check if user data is in local storage and set it if found
    const storedUserDataJSON = localStorage.getItem('user');
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);
      ctxDt.SetUser(storedUserData.user);
      ctxDt.SetExamCode(storedUserData.examCode);
    }
  }, []);

  const goToNextQuiz = () => {
    setQNo(qNo + 1);
    console.log(`Next : ${qNo}`);
  };

  const goToPreviousQuiz = () => {
    setQNo(qNo - 1);
    console.log(`Back : ${qNo}`);
  };

  return (
    <div className="content">
      <Timer />
      <div>
        {ctxDt.user} joined {ctxDt.examCode}
      </div>
      {state > 0 ? (
        <Quiz quizz={currentQuiz} qNo={qNo} />
      ) : (
        <div>There is no data for this quiz</div>
      )}
      <div>
        {state > 0 && qNo === 1 ? (
          <button disabled>Back</button>
        ) : (
          <button onClick={goToPreviousQuiz}>Back</button>
        )}
        {state > 0 && qNo >= Object.keys(data.lsQuizz).length ? (
          <button>Submit</button>
        ) : (
          <button onClick={goToNextQuiz}>Next</button>
        )}
      </div>
    </div>
  );
}
