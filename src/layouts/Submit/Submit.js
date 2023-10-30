import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ctx } from "../../CtxData";
import "./Submit.scss";

export default function Submit() {
  const nav = useNavigate();
  const ctxDt = useContext(ctx);
  const userExamKey = `${ctxDt.user}_${ctxDt.examCode}`;
  const storedSelectedJSON = localStorage.getItem(`${userExamKey}_2ce23d6a-64ee-4ba8-8cd6-1fc1a0a09e79`);
  const storedSelected = JSON.parse(storedSelectedJSON);

  // Retrieve the time remaining from local storage
  const storedTimeRemaining = localStorage.getItem(
    `${ctxDt.user}_timeRemaining_${ctxDt.examCode}`
  );

  // Debugging: Check the content of storedSelected
  useEffect(() => {
    console.log("storedSelected:", storedSelected);
  }, [storedSelected]);

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
        {storedSelected.lsAns && (
          <div>
            {`${storedSelected.user}`}'s Choices:
            {Object.keys(storedSelected.lsAns).map((quizId) => (
              <div key={quizId}>
                Quiz ID: {quizId} <br/>
                Choices: {storedSelected.lsAns[quizId].choice.join(", ")}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
