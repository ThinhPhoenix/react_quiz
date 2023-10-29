import React, { useContext, useEffect, useState } from "react";
import './Quiz.scss'
import { ctx } from "../../CtxData";

/**
 * @param string enter the key of element inside lsQuizz array
 * @example <Quiz quizz={`2ce23d6a-64ee-4ba8-8cd6-1fc1a0a09e79`}/>
 * @returns a div with a question and answer for the user to choose
 * @author ThinhPhoenix - SE182929
 * @version 1.0.2.0
 */

export default function Quiz(props) {
  const ctxDt = useContext(ctx);
  const [data, setdata] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [user, setUser] = useState(""); // State for the user
  const quizStorageKey = `${ctxDt.user}_${ctxDt.examCode}_${props.quizz}`; // Unique key for each quiz

  useEffect(() => {
    const id = ctxDt.examCode;
    fetch(`https://server.nglearns.com/quizz/${id}`)
      .then((res) => res.json())
      .then((dt) => {
        setdata(dt);
      });
    // Load user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Load previously selected answers from local storage for this quiz
    const storedUserDataJSON = localStorage.getItem(quizStorageKey);
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);
      setSelectedAnswers(storedUserData.answer);
    }
  }, [quizStorageKey]);

  if (!data.lsQuizz) {
    return null;
  }

  const thisQuiz = data.lsQuizz[props.quizz];
  const totalQuiz = Object.keys(data.lsQuizz).length;
  const isMultipleChoice = thisQuiz.isMutiple; // Fixed a typo here (isMutiple -> isMultiple)
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      let updatedAnswers;
      if (isMultipleChoice) {
        if (prevSelectedAnswers.includes(answerId)) {
          updatedAnswers = prevSelectedAnswers.filter((id) => id !== answerId);
        } else {
          updatedAnswers = [...prevSelectedAnswers, answerId];
        }
      } else {
        updatedAnswers = [answerId];
      }
  
      // Update local storage with the new selected answers
      const userData = {
        answer: updatedAnswers,
      };
      localStorage.setItem(quizStorageKey, JSON.stringify(userData));
  
      return updatedAnswers;
    });
  };

  return (
    <div className="wrapper quiz_cover wrap-text">
      <div className="qNoWrapper">
        <h2 className="Q_no">{`Quiz ${props.qNo}`}</h2>
        <h4><code>{`/${totalQuiz}`}</code></h4>
      </div>
      <h3 className="Q_quest">Question: {thisQuiz.content}</h3>
      {thisQuiz.answer.map((v, i) => (
        <div key={i} className="toggles">
          <input
            type={isMultipleChoice ? "checkbox" : "radio"}
            name={props.quizz}
            id={v.id}
            checked={selectedAnswers.includes(v.id)}
            onChange={() => handleAnswerSelect(v.id)}
          />
          <label htmlFor={`ans${i}`}>{v.content}</label>
        </div>
      ))}
    </div>
  );
}
