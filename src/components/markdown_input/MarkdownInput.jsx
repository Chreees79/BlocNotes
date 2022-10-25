import { useState, useEffect } from "react"

export default function MarkdownInput({ setCurrentId, update, setUpdate, notes, currentId, setCurrentNote, setCurrentTitle, currentNote, currentTitle, setNotes } ) {
  const [value, setValue] = useState('');
  const [valueTitle, setValueTitle] = useState('')

  useEffect(() => {
    setValue(currentNote)
    setValueTitle(currentTitle)
  }, [currentId])


  useEffect(() => {
    setCurrentNote(value)
  }, [value])

  useEffect(() => {
    setCurrentTitle(valueTitle)
  }, [valueTitle])
  
  const onChangeValue = (event) => {
    setValue(event.target.value);
  };
  const onChangeTitle = (event) => {
    setValueTitle(event.target.value);
  };

  const handleClick = () => {
    if (currentId === '') {
      setNotes((notes) => [
        ...notes,
        {
          content: currentNote,
          id: Date.now(),
          title: currentTitle
        }
      ]);
    } else {
      const noteToUpdate = notes.find((note) => note.id == currentId)
      noteToUpdate.content = currentNote
      noteToUpdate.title = currentTitle
      localStorage.setItem('notes', JSON.stringify(notes))
      setUpdate(!update)
    }
  }
  
  function handleDelete() {
    const newNotes = notes.filter((note) => note.id != currentId)
    setCurrentNote('')
    setCurrentTitle('')
    setCurrentId('')
    localStorage.setItem('notes', JSON.stringify(newNotes))
    setUpdate(!update)
  }

  return (
    <>
    <div className="MarkdownContainer">
      <div className="MarkdownField">
        <input value={valueTitle} onChange={onChangeTitle} />
        <textarea value={value} onChange={onChangeValue} />
        <div className="buttonSection">
          <button type="button" className="create" onClick={handleClick}>{currentId != '' ? 'Modifier' : 'Sauvegarder'}</button>
          {currentId != '' ? <button type="button" className="delete" onClick={handleDelete}>Supprimer</button> : ''}
        </div>
      </div>
    </div>
    </>
  );
}
