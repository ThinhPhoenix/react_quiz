import React, { useContext, useEffect, useState } from "react";
import Timer from "../../components/Timer/Timer";
import "./QuizScreen.scss";
import { ctx } from "../../CtxData";
import Quiz from "../../components/Quiz/Quiz";

export default function QuizScreen() {
  const [data, setdata] = useState({});
  const ctxDt = useContext(ctx);

  useEffect(() => {
    let id = ctxDt.examCode;
    fetch(`https://server.nglearns.com/quizz/${id}`)
      .then((res) => res.json())
      .then((dt) => {
        setdata(dt);
        console.log(dt);
      });
  }, []);

  // const testClick = () => {
  //   let quizs = QuizFetch(data)
  //   console.log(QuizFetch(data));
  //   for(var i = 0; i < quizs.length; i++){
  //        console.log(answerFetch(quizs, i))
  //   }
  // }

  return (
    <div className="content">
      <Timer />
      <div>{ctxDt.examCode}</div>
      <Quiz quizz={`2ce23d6a-64ee-4ba8-8cd6-1fc1a0a09e79`}/>
      <div>
        <button>Back</button>
        <button>Next</button>
      </div>
    </div>
  );
}
