import React, { createContext, useState } from 'react'

export const ctx = createContext()

export default function CtxData(props) {
const [examCode, SetExamCode] = useState(``)
const [user, SetUser] = useState(``)
const [Quiz, SetQuiz] = useState({})
  return (
    <ctx.Provider value={{examCode, SetExamCode, user, SetUser, Quiz, SetQuiz}}>
        {props.children}
    </ctx.Provider>
  )
}
