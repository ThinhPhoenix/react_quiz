import { shuffle } from "../Utils/Shuffle";

//Fetch an answer from a QUIZ base on position
//demo thisIsQuizArr = QuizFetch(data)   for(var i = 0; i < thisIsQuizArr.length; i++) thisIsAnAnswer = answerFetch(thisIsQuizArr, i)
//Version 1.0.0.0

export function answerFetch(quiz, pos) {
  let res = shuffle(quiz[pos].answer);
  return res;
}
