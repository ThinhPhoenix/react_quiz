import React, { useContext, useEffect, useState } from "react";
import './Quiz.scss'
import { ctx } from "../../CtxData";

/**
 * !Not done yet. missing
 * !for loops to check how many e in array and return that many div (class`toggles`)
 * !change isMultiple into json Quizz
 * @param {json quiz} json 
 * @returns a div with question and answer for user to choose
 */

export default function Quiz(props) {
  const ctxDt = useContext(ctx);
  const [data, setdata] = useState({});
  
  useEffect(() => {
    const id = ctxDt.examCode;
    fetch(`https://server.nglearns.com/quizz/${id}`)
      .then((res) => res.json())
      .then((dt) => {
        setdata(dt);
      });
  }, []);

  if (!data.lsQuizz) {
    return null; // Handle loading state or error state
  }

  const thisQuiz = data.lsQuizz[props.quizz];
  const totalQuiz = 5;
  const qNo = 1;
  const type = thisQuiz.isMultiple ? "checkbox" : "radio";

  return (
    <div className="wrapper quiz_cover wrap-text">
      <h2 className="Q_no">{`Quiz ${qNo}/${totalQuiz}`}</h2>
      <h3 className="Q_quest">Question: {thisQuiz.content}</h3>
      <div className="toggles">
        {thisQuiz.answer.map((answer, index) => (
          <div key={index}>
            <input type={type} name="ans" id={`ans${index}`} />
            <label htmlFor={`ans${index}`}>{answer.content}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
