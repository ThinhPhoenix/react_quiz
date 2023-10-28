import { shuffle } from "../Utils/Shuffle";

//Fetch answers from a quiz 
//demo 

export function answerFetch(quiz, pos) {
  let res = shuffle(quiz[pos].answer);
  return res;
}
