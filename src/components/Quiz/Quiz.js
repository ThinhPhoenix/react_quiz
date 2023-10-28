import React from "react";
import './Quiz.scss'

/**
 * !Not done yet. missing
 * !for loops to check how many e in array and return that many div (class`toggles`)
 * !change isMultiple into json Quizz
 * @param {json quiz} json 
 * @returns a div with question and answer for user to choose
 */

export default function Quiz({isMultiple}) {
  let totalQuiz = 5, qNo = 1, ansNum = 4
  let type = isMultiple ? `checkbox` : `radio`;
  return (
    <div className="wrapper quiz_cover wrap-text">
        <h2 className="Q_no">{`Quiz ${qNo}/`}<code>{totalQuiz}</code></h2>
        <h3 className="Q_quest">Question: Blabladahjkdshkjdsajhdhjghjhjgjhgjjkahdkjsjhakjhdjakhdjkahkjdahkjdhajskjkdhakjahskjahjdhasjkdhjkahdjsaksdjsabla.</h3>
      <div className="toggles">
        <input type={type} name="ans"/>
        <label>Answer number 1</label>
      </div>
      <div className="toggles">
        <input type={type} name="ans"/>
        <label>Answer number 2</label>
      </div>
      <div className="toggles">
        <input type={type} name="ans"/>
        <label>Answer number 3</label>
      </div>
      <div className="toggles">
        <input type={type} name="ans"/>
        <label>Answer number 4</label>
      </div>
    </div>
  );
}
