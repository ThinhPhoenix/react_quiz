import React, { useContext, useEffect, useState } from "react";
import './Quiz.scss'
import { ctx } from "../../CtxData";

/**
 * @param string enter the key of element inside lsQuizz array
 * @example <Quiz quizz={`2ce23d6a-64ee-4ba8-8cd6-1fc1a0a09e79`}/>
 * @returns a div with question and answer for user to choose
 * @author ThinhPhoenix - SE182929
 * @version 1.0.2.0
 */
export default function Quiz(props) {
  const ctxDt = useContext(ctx);
  const [data, setdata] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});

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
  const isMultipleChoice = thisQuiz.isMutiple;

  // Function to handle selecting answers
  const handleAnswerSelect = (answerId) => {
    const selected = selectedAnswers[props.quizz] || [];
    
    if (isMultipleChoice) {
      // For multiple-choice, toggle the selection
      if (selected.includes(answerId)) {
        const newSelected = selected.filter((id) => id !== answerId);
        setSelectedAnswers({
          ...selectedAnswers,
          [props.quizz]: newSelected,
        });
      } else {
        setSelectedAnswers({
          ...selectedAnswers,
          [props.quizz]: [...selected, answerId],
        });
      }
    } else {
      // For single-choice, set the selected answer
      setSelectedAnswers({
        ...selectedAnswers,
        [props.quizz]: [answerId],
      });
    }
  };

  return (
    <div className="wrapper quiz_cover wrap-text">
      <div className="qNoWrapper">
        <h2 className="Q_no">{`Quiz ${props.qNo}`}</h2><h4><code>{`/${totalQuiz}`}</code></h4>
      </div>
      <h3 className="Q_quest">Question: {thisQuiz.content}</h3>
      {thisQuiz.answer.map((v, i) => (
        <div key={i} className="toggles">
          <input
            type={isMultipleChoice ? "checkbox" : "radio"}
            name={props.quizz}
            id={v.id}
            checked={(selectedAnswers[props.quizz] || []).includes(v.id)}
            onChange={() => handleAnswerSelect(v.id)}
          />
          <label htmlFor={`ans${i}`}>{v.content}</label>
        </div>
      ))}
    </div>
  );
}
