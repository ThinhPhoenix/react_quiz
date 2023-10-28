import { shuffle } from "../Utils/Shuffle";

export function answerFetch(quiz, pos) {
  let res = shuffle(quiz[pos].answer);
  return res;
}
