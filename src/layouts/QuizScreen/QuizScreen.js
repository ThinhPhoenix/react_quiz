import React, { useContext, useEffect, useState } from "react";
import Timer from "../../components/Timer/Timer";
import "./QuizScreen.scss";
import { ctx } from "../../CtxData";
import Quiz from "../../components/Quiz/Quiz";
import { Link } from "react-router-dom";

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

  
  return (
    <div className="content">
      <Timer />
      <div>{ctxDt.examCode}</div>
      <Quiz isMultiple={false}/>
      <div>
      <button>Back</button>
      <button>Next</button>
      </div>
    </div>
  );
}
