import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ctx } from "../../CtxData";
import './Submit.scss';

export default function Submit() {
  const nav = useNavigate();
  const ctxDt = useContext(ctx);

  // Get the current time
  const currentTime = new Date();

  // Retrieve the time remaining from local storage
  const storedTimeRemaining = localStorage.getItem(`${ctxDt.user}_timeRemaining`);
  
  // Convert the stored time remaining (in seconds) to a Date object
  const storedTimeRemainingInSeconds = parseInt(storedTimeRemaining, 10);
  const storedTimeRemainingMilliseconds = storedTimeRemainingInSeconds * 1000;
  const storedTimeRemainingDate = new Date(currentTime - storedTimeRemainingMilliseconds);

  // Calculate the time taken for the quiz
  const timeTakenMilliseconds = currentTime - storedTimeRemainingDate;
  const timeTakenSeconds = Math.floor(timeTakenMilliseconds / 1000);
  const timeTakenMinutes = Math.floor(timeTakenSeconds / 60);
  const timeTakenSecondsRemaining = timeTakenSeconds % 60;

  return (
    <div className="join_submit">
      <p>
        Thank you for doing this quiz.
      </p>
      <div className="wrapper submit">
        Your finished in {`${timeTakenMinutes} minutes ${timeTakenSecondsRemaining} seconds`} with {100} <code>points</code>
      </div>
      <button onClick={() => nav('/')}>Back to main</button>
    </div>
  );
}
