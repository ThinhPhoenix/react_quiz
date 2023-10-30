import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ctx } from "../../CtxData";
import "./Submit.scss";

export default function Submit() {
  const nav = useNavigate();
  const ctxDt = useContext(ctx);
  const userExamKey = `${ctxDt.user}_${ctxDt.examCode}`;
  const lsQuizId = Object.keys(ctxDt.Quiz.lsQuizz);

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

  // Debugging: Check the content of allQuizData
  useEffect(() => {
    console.log("allQuizData:", allQuizData);
  }, [allQuizData]);

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
        with {100} <code>points</code>
      </div>
      <button onClick={() => nav("/")}>Back to main</button>
      <div>
        Debugging:
        {Object.keys(allQuizData).map((quizId) => (
          <div key={quizId}>
            Quiz ID: {quizId}
            {allQuizData[quizId] ? (
              <div>
                {`${allQuizData[quizId].user}`}'s Choices:
                {Object.keys(allQuizData[quizId].lsAns).map((quizId) => (
                  <div key={quizId}>
                    Quiz ID: {quizId} <br />
                    Choices:{" "}
                    {allQuizData[quizId].lsAns[quizId].choice.join(", ")}
                  </div>
                ))}
              </div>
            ) : (
              <div>Choices: None</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
