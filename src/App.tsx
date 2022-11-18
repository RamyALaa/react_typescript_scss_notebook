import { useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.scss'
import NewNote from './NewNote'

export  type Note = {
  id : string
} & NoteData

export type NoteData = {
  title : string;
  markdown : string;
  tags : Tag[];
}

export  type Tag = {
  id : string;
  label : string;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Routes>
        <Route path='/' element={<h1>hi</h1>} />
        <Route path='/new' element={<NewNote/>} />
        <Route path='/:id' element={<h1>new</h1>} />
          <Route index element={<h1>show</h1>} />
          <Route path="edit" element={<h1>edit</h1>}/>
        <Route path='/new' element={<h1>new</h1>} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App
