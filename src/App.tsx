import { useMemo } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.scss'
import NewNote from './NewNote'
import { useLocalStorage } from './useLocalStorage'
import {v4 as uuidV4} from 'uuid'
import { NoteList } from './NoteList'
import NoteLayout from './NoteLayout'
import Note from './Note'
import EditNote from './EditNote'

// add function update note
// add function delete note
// add function update tag
// add function delete tag


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
      return {...note , tags : tags.filter( tag => note.tagIds.includes(tag.id)) }
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

  function addTag(tag : Tag){
    setTags(prevTags => [...prevTags, tag])
  }

  function onUpdateNote(id : string, {tags, ...data}: NoteData){
    console.log(id)
    console.log(tags)
    console.log(data)
    setNotes(prevNotes => { return prevNotes.map(note =>{
        if(note.id === id)
          return {...note, ...data, tagdIds : tags.map(tag =>
            tag.id)}
        else
          return note
      })})
  }

  function onDeleteNote(id : string){
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }


  function onUpdateTag(id : string, label : string){
    setTags(prevTags => { return prevTags.map(tag =>{
        if(tag.id === id)
          return {...tag, label}
        else
          return tag
      })})
  }

  function onDeleteTag(id : string){
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<NoteList notes={notesWithTags} availableTags={tags} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />} />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags}/>} >
          <Route index element={<Note onDeleteNote={onDeleteNote}/>} />
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />}/>
        </Route>
        <Route path='/new' element={<h1>new</h1>} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
    </div>
  )
}

export default App
