import React from 'react'
import Showdown from 'showdown'

export default function NoteDisplay({ setCurrentId, currentNote, currentTitle, notes, setCurrentTitle, setCurrentNote }) {
  const converter = new Showdown.Converter();

  function content() {
    return (
      {__html: converter.makeHtml(currentNote)}
    )
  }


  function convertNotes(content) {
    const shortContent = content.split(' ').slice(0, 15).join(' ') + ( content.length < 15 ? '' : '...' )
    return (
      {__html: converter.makeHtml(shortContent)}
    )
  }

  function handleClick(e) {
    const noteId = e.currentTarget.id
    const noteToDisplay = notes.find((note) => note.id == noteId)
    setCurrentNote(noteToDisplay.content)
    setCurrentTitle(noteToDisplay.title)
    setCurrentId(noteId)
  }

  function newNote() {
    setCurrentNote('')
    setCurrentTitle('')
    setCurrentId('')
  }

  return (
    <div>
      <div className="DisplayContainer">
        <div className="DisplayField">
          <h2>Note:</h2><h3>{currentTitle}</h3>
          <div dangerouslySetInnerHTML={content()}/>
        </div>
      </div>
      <div className="ListContainer">
        <div className='ListContainerTop'>
          <button type='button' onClick={newNote} className='buttonAddNote'>Nouvelle note</button>
        </div>
        <ul>
          {notes.map((note) => (
            <div className="noteContainer" key={note.id} id={note.id} onClick={handleClick}>
              <h2>{note.title}</h2>
              <div dangerouslySetInnerHTML={convertNotes(note.content)} />
            </div> 
          ))}
        </ul>
      </div>
    </div>
  ) 
}
