import { shuffle } from "../Utils/Shuffle";

//Fetch Quizzes in data
//demo QuizFetch(data) -> [quiz1, quiz2, quiz3, ...]
//Version 1.1.0.0

export function QuizFetch(data) {
  let res = shuffle(Object.keys(data.lsQuizz));
  return res;
}
