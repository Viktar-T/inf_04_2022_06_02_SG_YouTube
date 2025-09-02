import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'

function App() {
  const [courses, setCourses] = useState([
    'Programowanie w C#',
    'Angular dla początkujących',
    'Kurs Django',
  ])
  const [numer, setNumer] = useState(0)

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
      <form> 
        <div className="form-group"> 
          <label htmlFor="imieNazw">Imie i nazwisko</label> 
          <input type="text" className="form-control" id="imieNazw" /> 
        </div> 
        <div className="form-group"> 
          <label>Numer kursu:</label> 
          <input type="number" className="form-control" id="numer" /> 
        </div> 
        <button type="button" className="btn btn-primary">
        Zapisz do kursu
        </button>
      </form>
    </div>
  );
}

export default App;
