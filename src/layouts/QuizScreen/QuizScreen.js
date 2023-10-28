import React, { useContext, useEffect, useState } from "react";
import Timer from "../../components/Timer/Timer";
import "./QuizScreen.scss";
import { ctx } from "../../CtxData";
import Quiz from "../../components/Quiz/Quiz";
import { Link } from "react-router-dom";
import {QuizFetch} from "../../components/Utils/QuizFetch"

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

  const testClick = () => {
    let quizs = QuizFetch(data) 
    console.log(QuizFetch(data));
    for(var i = 0; i < quizs.length; i++){
    }
  }
  return (
    <div className="content">
      <Timer />
      <div>{ctxDt.examCode}</div>
      <Quiz isMultiple={false}/>
      <div>
      <button>Back</button>
      <button>Next</button>
      <button onClick={testClick}>test</button>
      </div>
    </div>
  );
}
