import MarkdownInput from "./components/markdown_input/MarkdownInput"
import NoteDisplay from "./components/note_display/NoteDisplay"
import { useState, useEffect } from "react"

function App() {
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currentNote, setCurrentNote] = useState('')
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const saveNotes = localStorage.getItem("notes")
    setNotes(JSON.parse(saveNotes) ?? []);
    setLoading(true)
  }, [update]);
  

  useEffect(() => {
    if (loading) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, loading])


  return (
    <div className="App">
      <NoteDisplay notes={notes} currentNote={currentNote} currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} setCurrentNote={setCurrentNote} setCurrentId={setCurrentId} />
      <MarkdownInput setCurrentId={setCurrentId} update={update} setUpdate={setUpdate} notes={notes} currentId={currentId} setCurrentNote={setCurrentNote} setCurrentTitle={setCurrentTitle} currentNote={currentNote} currentTitle={currentTitle} setNotes={setNotes}/>
    </div>
  )
}

export default App
