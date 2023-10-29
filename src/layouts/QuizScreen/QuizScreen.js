import React, { useContext, useEffect, useState } from "react";
import Timer from "../../components/Timer/Timer";
import "./QuizScreen.scss";
import { ctx } from "../../CtxData";
import Quiz from "../../components/Quiz/Quiz";

export default function QuizScreen() {
  let totalQuiz
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
      totalQuiz = Object.keys(data.lsQuizz).length
    }
  }, [state, data, qNo]);

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
        {ctxDt.examCode} - {state}
      </div>
      {state > 0 ? (
        <Quiz quizz={currentQuiz} qNo={qNo} data={data} />
      ) : (
        <div>There is no data of this quiz</div>
      )}
      <div>
        <button onClick={goToPreviousQuiz}>Back</button>
        <button onClick={goToNextQuiz}>Next</button>
      </div>
    </div>
  );
}
