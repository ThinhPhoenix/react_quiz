import React, { useContext, useEffect, useState } from "react";
import './Quiz.scss'
import { ctx } from "../../CtxData";

/**
 * @param string enter the key of element inside lsQuizz array
 * @example <Quiz quizz={`2ce23d6a-64ee-4ba8-8cd6-1fc1a0a09e79`}/>
 * @returns a div with question and answer for user to choose
 * @author ThinhPhoenix - SE182929
 * @version 1.0.0.1
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
  const totalQuiz = Object.keys(data.lsQuizz).length;
  const type = thisQuiz.isMutiple ? "checkbox" : "radio";
  console.log(thisQuiz.isMutiple);
  console.log(type);

  return (
    <div className="wrapper quiz_cover wrap-text">
      <h2 className="Q_no">{`Quiz ${props.qNo}/`}<code>{`${totalQuiz}`}</code></h2>
      <h3 className="Q_quest">Question: {thisQuiz.content}</h3>
        {thisQuiz.answer.map((v, i) => (
          <div key={i} className="toggles">
            <input type={type} name="ans" id={`ans${i}`} />
            <label htmlFor={`ans${i}`}>{v.content}</label>
          </div>
        ))}
    </div>
  );
}
