import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<h1>hi</h1>} />
      <Route path='/new' element={<h1>new</h1>} />
    </Routes>
  )
}

export default App
