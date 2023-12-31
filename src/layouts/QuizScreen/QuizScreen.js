import React, { useContext, useEffect, useState } from "react";
import Timer from "../../components/Timer/Timer";
import "./QuizScreen.scss";
import { ctx } from "../../CtxData";
import Quiz from "../../components/Quiz/Quiz";
import { useNavigate, useParams } from "react-router-dom";
import { QuizFetch } from "../../components/Utils/QuizFetch";

export default function QuizScreen() {
  const nav = useNavigate();
  const param = useParams();
  const [state, setState] = useState(0);
  const [data, setData] = useState({});
  const ctxDt = useContext(ctx);
  const [currentQuiz, setCurrentQuiz] = useState("");
  const [quizKey, setquizKey] = useState([]);
  const [qNo, setQNo] = useState(1);

  if(localStorage.getItem(`${ctxDt.user}_isSubmitted_${ctxDt.examCode}`) != null){
    nav(`/submit/${ctxDt.examCode}`);
  }

  useEffect(() => {
    let id = param.id;

    ctxDt.SetExamCode(id);
    ctxDt.SetUser(param.username);

    console.log(ctxDt);
    fetch(`https://server.nglearns.com/quizz/${id}`)
      .then((res) => res.json())
      .then((dt) => {
        setData(dt);
        setState(state + 1);
        setquizKey(QuizFetch(dt));
        ctxDt.SetQuiz(dt);
      });
  }, []);
  useEffect(() => {
    if (state === 1 && data && data.lsQuizz) {
      const newCurrentQuiz = quizKey[qNo - 1];
      setCurrentQuiz(newCurrentQuiz);
    }
  }, [state, data, qNo]);

  useEffect(() => {
    // Check if user data is in local storage and set it if found
    const storedUserDataJSON = localStorage.getItem("user");
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);
      ctxDt.SetUser(storedUserData.user);
      ctxDt.SetExamCode(storedUserData.examCode);
    }
  }, []);

  const goToNextQuiz = () => {
    setQNo(qNo + 1);
    console.log(`Next : ${qNo}`);
  };

  const goToPreviousQuiz = () => {
    setQNo(qNo - 1);
    console.log(`Back : ${qNo}`);
  };

  const submithandle = () => () => {
    nav(`/submit/${ctxDt.examCode}`);
  };

  function SubmitButton() {
    return(
      <button className='dark' onClick={submithandle()}>Submit</button>
    )
  }

  return (
    <div className="content">
      <Timer user={ctxDt.user} />
      <div className="title">
        {ctxDt.user} joined {ctxDt.Quiz.title}
      </div>
      {state > 0 ? (
        <Quiz quizz={currentQuiz} qNo={qNo} />
      ) : (
        <div>There is no data for this quiz</div>
      )}
      <div>
        {state > 0 && qNo === 1 ? (
          <button disabled>Back</button>
        ) : (
          <button onClick={goToPreviousQuiz}>Back</button>
        )}
        {state > 0 && qNo >= Object.keys(data.lsQuizz).length ? (
          <SubmitButton/>
        ) : (
          <button onClick={goToNextQuiz}>Next</button>
        )}
      </div>
    </div>
  );
}