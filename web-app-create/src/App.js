import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'

function App() {
  const [courses, setCourses] = useState([
    'Programowanie w C#',
    'Angular dla początkujących',
    'Kurs Django',
  ])

  const [nameAndSurname, setNameAndSurname] = useState('')
  const [courseNumber, setCourseNumber] = useState(0)

  const onNameAndSurnameChange = (event) => {
    setNameAndSurname(event.target.value)
  }

  const onCourseNumberChange = (event) => {
    setCourseNumber(event.target.value)
  }
  
  const onSubmit = (event) => {
    event.preventDefault()
    console.log(nameAndSurname)
    if (courses[courseNumber-1]) {
      console.log(courses[courseNumber-1])
    } else {
      console.log("Nieprawidłowy numer kursu")
    }
  }

  return (
    <div>
      <h2>Liczba kursów: {courses.length}</h2>
      <ol>
          {courses.map((course, index) => (
          <li key={`course-${index}`}>
            {course}
          </li>
        ))}
      </ol>
      <form onSubmit={onSubmit}> 
        <div className="form-group"> 
          <label htmlFor="imieNazw">Imie i nazwisko</label> 
          <input onChange={onNameAndSurnameChange}
          type="text" 
          className="form-control" 
          id="imieNazw" /> 
        </div> 
        <div className="form-group"> 
          <label htmlFor="numer">Numer kursu:</label> 
          <input 
          onChange={onCourseNumberChange}
          type="number" 
          className="form-control" 
          id="numer" /> 
        </div> 
        <button type="submit" className="btn btn-primary">
        Zapisz do kursu
        </button>
      </form>
    </div>
  );
}

export default App;
