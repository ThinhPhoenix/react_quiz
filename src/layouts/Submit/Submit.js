import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ctx } from "../../CtxData";
import "./Submit.scss";

export default function Submit() {
  let debug = false;
  const [score, setScore] = useState(0);
  const nav = useNavigate();
  const ctxDt = useContext(ctx);
  const userExamKey = `${ctxDt.user}_${ctxDt.examCode}`;
  const lsQuizId = ctxDt.Quiz.lsQuizz ? Object.keys(ctxDt.Quiz.lsQuizz) : [];

  // Retrieve the time remaining from local storage
  const storedTimeRemaining = localStorage.getItem(
    `${ctxDt.user}_timeRemaining_${ctxDt.examCode}`
  );

  useEffect(() => {
    // Function to retrieve data for a quiz from local storage
    const retrieveQuizData = (quizId) => {
      const quizDataKey = `${userExamKey}_${quizId}`;
      const quizDataJSON = localStorage.getItem(quizDataKey);

      if (quizDataJSON) {
        return JSON.parse(quizDataJSON);
      } else {
        return null;
      }
    };

    // Create an array to store the data in the required format
    const convertedData = [];

    lsQuizId.forEach((quizId) => {
      const quizData = retrieveQuizData(quizId);

      if (quizData) {
        const choices = quizData.lsAns[quizId].choice;
        choices.forEach((answerId) => {
          convertedData.push({
            quesId: quizId,
            answerId,
          });
        });
      }
    });

    // Save the converted data in the required format to local storage (if needed)
    localStorage.setItem("convertedData", JSON.stringify(convertedData));

    fetch(`https://server.nglearns.com/answer/${ctxDt.examCode}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(convertedData),
    })
      .then((res) => res.json())
      .then((dt) => {
        console.log(dt);

        // Check if the score has been saved previously
        const scoreKey = `${ctxDt.user}_${ctxDt.examCode}_score`;
        const hasSavedScore = localStorage.getItem(scoreKey) === "true";

        if (!hasSavedScore) {
          setScore(dt);
          // Save the score to local storage
          // Save the score to local storage
          localStorage.setItem(scoreKey, dt);
        }
      });
  }, []);

  // Retrieve the score from local storage (if it exists)
  useEffect(() => {
    const storedScore = localStorage.getItem(
      `${ctxDt.user}_${ctxDt.examCode}_score`
    );

    if (storedScore) {
      setScore(JSON.parse(storedScore));
    }
  }, [ctxDt.user, ctxDt.examCode]);

  console.log("Score:", score);

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
        with {localStorage.getItem(`${ctxDt.user}_${ctxDt.examCode}_score`)} <code>points</code>
      </div>
      <button onClick={() => nav("/")}>Back to main</button>
      {debug && (
        <div>
          Debugging: <br />
          Exam ID: {ctxDt.examCode} <br />
        </div>
      )}
    </div>
  );
}
