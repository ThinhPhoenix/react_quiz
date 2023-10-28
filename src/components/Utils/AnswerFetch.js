import { shuffle } from "../Utils/Shuffle";

//Fetch an answer from a QUIZ base on position
//demo thisIsQuizArr = QuizFetch(data)   for(var i = 0; i < thisIsQuizArr.length; i++) thisIsAnAnswer = answerFetch(thisIsQuizArr, i)

export function answerFetch(quiz, pos) {
  let res = shuffle(quiz[pos].answer);
  return res;
}
