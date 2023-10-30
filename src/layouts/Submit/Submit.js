import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ctx } from "../../CtxData";
import "./Submit.scss";

function convertDataToNewFormat(savedData) {
  const convertedData = [];

  for (const quizId in savedData.lsAns) {
    const choices = savedData.lsAns[quizId].choice;
    choices.forEach((answerId) => {
      convertedData.push({
        quesId: quizId,
        answerId,
      });
    }); // Add the missing closing parenthesis here
  }

  return convertedData;
}


export default function Submit() {
  let debug = true;
  const [score,setScore] = useState()
  const nav = useNavigate();
  const ctxDt = useContext(ctx);
  const userExamKey = `${ctxDt.user}_${ctxDt.examCode}`;
  const lsQuizId = ctxDt.Quiz.lsQuizz ? Object.keys(ctxDt.Quiz.lsQuizz) : [];

  localStorage.setItem(`${ctxDt.user}_isSubmitted_${ctxDt.examCode}`, `true`);

  // Retrieve the time remaining from local storage
  const storedTimeRemaining = localStorage.getItem(
    `${ctxDt.user}_timeRemaining_${ctxDt.examCode}`
  );

  // Create an object to store data for all quizzes
  const allQuizData = {};

  // Iterate through lsQuizId and fetch data for each quiz
  lsQuizId.forEach((quizId) => {
    const quizDataKey = `${userExamKey}_${quizId}`;
    const quizDataJSON = localStorage.getItem(quizDataKey);

    if (quizDataJSON) {
      const quizData = JSON.parse(quizDataJSON);
      allQuizData[quizId] = quizData;
    } else {
      allQuizData[quizId] = null;
    }
  });

  useEffect(() => {
    const convertedData = convertDataToNewFormat(allQuizData);
    
    fetch("https://server.nglearns.com/answer/285498f5-3486-434d-a459-bedb6bcea7ce", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(convertedData)
    })
    .then((res) => res.json())
    .then((dt) => {
      console.log(dt);
      setScore(dt)
    });
  }, []);
  

  console.log("allQuizData:", allQuizData);

  // Convert the stored time remaining (in seconds) to a number
  const storedTimeRemainingInSeconds = parseInt(storedTimeRemaining, 10);

  // Calculate the time taken for the quiz (3600 seconds - time remaining)
  const timeTakenSeconds = 3600 - storedTimeRemainingInSeconds;
  const timeTakenMinutes = Math.floor(timeTakenSeconds / 60);
  const timeTakenSecondsRemaining = timeTakenSeconds % 60;

  return (
    <div className="join_submit">
      <p>Thank you for doing this quiz.</p>
      <div className="wrapper submit">
        You finished in{" "}
        {`${timeTakenMinutes} minutes ${timeTakenSecondsRemaining} seconds`}{" "}
        with {score} <code>points</code>
      </div>
      <button onClick={() => nav("/")}>Back to main</button>
      {debug && (
        <div>
          Debugging: <br />
          Exam ID: {ctxDt.examCode} <br />
          {`${ctxDt.user}'s selected answers: `}
          {Object.keys(allQuizData).map((quizId) => (
            <div key={quizId}>
              {allQuizData[quizId] ? (
                <div>
                  {Object.keys(allQuizData[quizId].lsAns).map((quizId) => (
                    <div key={quizId}>
                      Quiz ID: {quizId} <br />
                      Choices:{" "}
                      {allQuizData[quizId].lsAns[quizId].choice.join(", ")}
                    </div>
                  ))}
                </div>
              ) : (
                <div>{/* /Blank */}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
