import { useMemo, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.scss'
import NewNote from './NewNote'
import { useLocalStorage } from './useLocalStorage'
import {v4 as uuidV4} from 'uuid'
export  type Note = {
  id : string
} & NoteData

export type NoteData = {
  title : string
  markdown : string
  tags : Tag[]
}

export type RawNote = {
  id : string
} & RawNoteData

export type RawNoteData = {
  title : string
  markdown : string
  tagIds : string[] 
}

export  type Tag = {
  id : string
  label : string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const notesWithTags = useMemo(() =>{
    return notes.map(note => {
      return {...note , tagIds : tags.filter( tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data} : NoteData){
    setNotes( prevNotes =>{
      return [
        ...prevNotes , {
          ...data, id: uuidV4() , tagIds : tags.map(tag => tag.id)
        }]
    })
  }
  return (
    <div >
      <Routes>
        <Route path='/' element={<h1>hi</h1>} />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} />} />
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
