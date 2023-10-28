import { shuffle } from "../Utils/Shuffle";

export function QuizFetch(data) {
  let res = shuffle(Object.values(data.lsQuizz));
  return res;
}
