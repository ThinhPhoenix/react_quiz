import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home/Home";
import QuizScreen from "./layouts/QuizScreen/QuizScreen";
import QuizFetch from "./components/Utils/QuizFetch";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<QuizScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
