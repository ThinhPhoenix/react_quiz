import React, { useContext, useEffect, useState } from "react";
import Timer from "../../components/Timer/Timer";
import "./QuizScreen.scss";
import { ctx } from "../../CtxData";
import Quiz from "../../components/Quiz/Quiz";

export default function QuizScreen() {
  const [data, setdata] = useState({});
  const ctxDt = useContext(ctx);
  const [currentQuiz, setCurQuiz] = useState(``);

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

//test key: 48c9945c-c048-4cdc-99c3-249c4a320386
console.log(Object.keys(data.lsQuizz).length);

const goToNextQuiz = () => {
  //if did current question -> change currentKey to next (index++) Đéo cho bỏ trống
  console.log(`Next`);
};

const goToPreviousQuiz = () => {
  //change currentKey to before (index--)
  console.log(`Back`);
};

let qNo = 1

return (
  <div className="content">
    <Timer />
    <div>{ctxDt.examCode}</div>
    <Quiz quizz={`48c9945c-c048-4cdc-99c3-249c4a320386`} qNo={qNo}/>
    <div>
      <button onClick={goToPreviousQuiz}>Back</button>
      <button onClick={goToNextQuiz}>Next</button>
    </div>
  </div>
);
}
