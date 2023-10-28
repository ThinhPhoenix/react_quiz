import React, { createContext, useState } from 'react'

export const ctx = createContext()

export default function CtxData(props) {
const [examCode, SetExamCode] = useState(``)
  return (
    <ctx.Provider value={{examCode, SetExamCode}}>
        {props.children}
    </ctx.Provider>
  )
}
