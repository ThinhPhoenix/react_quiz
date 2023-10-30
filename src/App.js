import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./layouts/Home/Home";
import QuizScreen from "./layouts/QuizScreen/QuizScreen";
import QuizFetch from "./components/Utils/QuizFetch";
import Submit from "./layouts/Submit/Submit";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id/:username" element={<QuizScreen />} />
          <Route path="/submit/:id" element={<Submit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
