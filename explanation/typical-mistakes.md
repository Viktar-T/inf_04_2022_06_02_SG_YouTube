# Typowe Potencjalne Błędy w "Część II. Aplikacja Web"

Ten dokument opisuje najczęstsze błędy, które studenci popełniają podczas implementacji zadania aplikacji web. Każda sekcja zawiera praktyczne przykłady niepoprawnego i poprawnego kodu, wraz z wyjaśnieniami, dlaczego te błędy występują i jak ich unikać.

## 1. Błędy Obsługi Formularza

**Opis:** Obsługa formularza to jeden z najbardziej krytycznych aspektów aplikacji. Studenci często zapominają o fundamentalnych koncepcjach formularzy React, co prowadzi do uszkodzonej funkcjonalności, przeładowań strony lub niemożności przechwycenia danych użytkownika. Te błędy mogą całkowicie zepsuć podstawową funkcjonalność aplikacji.

### Brak preventDefault()
```javascript
// ❌ BŁĘDNE - Strona się przeładuje
const onSubmit = (event) => {
  console.log(nameAndSurname);
  // Brak event.preventDefault()
}

// ✅ POPRAWNE
const onSubmit = (event) => {
  event.preventDefault();
  console.log(nameAndSurname);
}
```

### Niepoprawna Obsługa Wysyłania Formularza
```javascript
// ❌ BŁĘDNE - Używanie onClick na przycisku zamiast onSubmit na formularzu
<form>
  <button onClick={handleSubmit}>Submit</button>
</form>

// ✅ POPRAWNE
<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

### Brak Wartości Pól Wprowadzania
```javascript
// ❌ BŁĘDNE - Pole nie kontrolowane ani nie dostępne
<input type="text" className="form-control" />

// ✅ POPRAWNE (podejście useState)
<input 
  type="text" 
  className="form-control"
  value={nameAndSurname}
  onChange={(e) => setNameAndSurname(e.target.value)}
/>

// ✅ POPRAWNE (podejście useRef)
<input 
  type="text" 
  className="form-control"
  ref={nameRef}
/>
```

## 2. Błędy Indeksowania Tablic

**Opis:** Błędy indeksowania tablic są niezwykle częste w tym zadaniu z powodu niezgodności między danymi użytkownika (numeracja 1-podstawowa) a indeksowaniem tablic JavaScript (0-podstawowe). Studenci często popełniają błędy off-by-one, które powodują niepowodzenia walidacji i niepoprawne wybory kursów. To fundamentalna koncepcja programowania, z którą wielu ma problemy.

### Błąd Off-by-One
```javascript
// ❌ BŁĘDNE - Użytkownik wprowadza liczby 1-podstawowe, tablica jest 0-podstawowa
if (courses[courseNumber]) {  // To sprawdza błędny indeks
  console.log(courses[courseNumber]);
}

// ✅ POPRAWNE
if (courses[courseNumber - 1]) {  // Odejmij 1 dla indeksowania 0-podstawowego
  console.log(courses[courseNumber - 1]);
}
```

### Niepoprawna Logika Walidacji
```javascript
// ❌ BŁĘDNE - Nie obsługuje przypadków brzegowych
if (courses[courseNumber]) {
  console.log(courses[courseNumber]);
} else {
  console.log("Nieprawidłowy numer kursu");
}

// ✅ POPRAWNE - Obsługuje undefined, null, pusty ciąg
if (courses[courseNumber - 1]) {
  console.log(courses[courseNumber - 1]);
} else {
  console.log("Nieprawidłowy numer kursu");
}
```

### Błędne Obsługiwanie Typów Danych
```javascript
// ❌ BŁĘDNE - courseNumber może być ciągiem z pola wprowadzania
const courseIndex = courseNumber - 1;  // "2" - 1 = 1 (działa) ale "0" - 1 = -1

// ✅ LEPIEJ - Konwertuj na liczbę jawnie
const courseIndex = parseInt(courseNumber) - 1;
// lub
const courseIndex = Number(courseNumber) - 1;
```

## 3. Błędy Integracji Bootstrap

**Opis:** Problemy z integracją Bootstrap wynikają z tego, że studenci nie rozumieją, jak frameworki CSS działają z React. Wielu studentów używa klas Bootstrap bez importowania CSS lub używa przestarzałych/niepoprawnych nazw klas. To skutkuje niestylowanymi formularzami, które nie spełniają wymagań egzaminu dla właściwej prezentacji wizualnej.

### Brak Importu Bootstrap
```javascript
// ❌ BŁĘDNE - Używanie klas Bootstrap bez importowania CSS
function App() {
  return (
    <div className="form-group">  {/* Nie będzie stylowane */}
      <input className="form-control" />
    </div>
  );
}

// ✅ POPRAWNE - Importuj CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
```

### Niepoprawne Użycie Klas Bootstrap
```javascript
// ❌ BŁĘDNE - Niepoprawne lub przestarzałe klasy Bootstrap
<div className="form-group">  // Klasa Bootstrap 4
  <label className="control-label">Name:</label>  // Klasa Bootstrap 3
  <input className="form-input" />  // Błędna nazwa klasy
</div>

// ✅ POPRAWNE - Właściwe klasy Bootstrap 5
<div className="mb-3">  // lub form-group dla Bootstrap 4
  <label className="form-label">Name:</label>
  <input className="form-control" />
</div>
```

### Brak Struktury Formularza
```javascript
// ❌ BŁĘDNE - Słaba struktura formularza
<div>
  <label>Name:</label>
  <input className="form-control" />
  <label>Course Number:</label>
  <input className="form-control" />
  <button className="btn btn-primary">Submit</button>
</div>

// ✅ POPRAWNE - Właściwa struktura formularza Bootstrap
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input id="name" className="form-control" />
  </div>
  <div className="form-group">
    <label htmlFor="courseNum">Course Number:</label>
    <input id="courseNum" className="form-control" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
```

## 4. Błędy Specyficzne dla React

**Opis:** Błędy specyficzne dla React występują, gdy studenci nie przestrzegają najlepszych praktyk React lub błędnie rozumieją koncepcje React. Obejmują one brak właściwości key w listach, niepoprawne zarządzanie stanem i niewłaściwe użycie hooków React. Te błędy mogą powodować problemy z wydajnością, ostrzeżenia lub nieoczekiwane zachowanie w aplikacji.

### Brak Właściwości Key w Listach
```javascript
// ❌ BŁĘDNE - Brak właściwości key
{courses.map((course, index) => (
  <li>{course}</li>  // Brak właściwości key
))}

// ✅ POPRAWNE
{courses.map((course, index) => (
  <li key={index}>{course}</li>
))}
// lub lepiej z unikalnym identyfikatorem
{courses.map((course, index) => (
  <li key={`course-${index}`}>{course}</li>
))}
```

### Niepoprawne Aktualizacje Stanu
```javascript
// ❌ BŁĘDNE - Bezpośrednia mutacja stanu
const addCourse = () => {
  courses.push("New Course");  // Mutowanie stanu bezpośrednio
  setCourses(courses);
}

// ✅ POPRAWNE - Niezmienialna aktualizacja stanu
const addCourse = () => {
  setCourses([...courses, "New Course"]);
}
```

### Brak Zależności w useEffect
```javascript
// ❌ BŁĘDNE - Jeśli używasz useEffect z brakującymi zależnościami
useEffect(() => {
  console.log(courses.length);
}, []);  // Brak zależności courses

// ✅ POPRAWNE
useEffect(() => {
  console.log(courses.length);
}, [courses]);
```

## 5. Błędy HTML/JSX

**Opis:** Błędy HTML/JSX to podstawowe, ale krytyczne błędy, które wpływają na dostępność, doświadczenie użytkownika i funkcjonalność formularza. Studenci często zapominają o właściwych asocjacjach etykiet, używają błędnych typów pól wprowadzania lub pomijają ważne atrybuty. Te błędy mogą sprawić, że formularze będą bezużyteczne lub niedostępne dla użytkowników.

### Niepoprawna Asocjacja Etykiet
```javascript
// ❌ BŁĘDNE - Etykieta nie jest właściwie powiązana z polem wprowadzania
<label>Name:</label>
<input className="form-control" />

// ✅ POPRAWNE - Właściwa asocjacja etykiet
<label htmlFor="name">Name:</label>
<input id="name" className="form-control" />
```

### Błędne Typy Pól Wprowadzania
```javascript
// ❌ BŁĘDNE - Używanie pola tekstowego dla liczb
<input type="text" />  // Dla pola numeru kursu

// ✅ POPRAWNE - Używanie odpowiedniego typu pola wprowadzania
<input type="number" />  // Dla pola numeru kursu
```

### Brak Wymaganych Atrybutów
```javascript
// ❌ BŁĘDNE - Brak ważnych atrybutów
<input className="form-control" />

// ✅ POPRAWNE - Z właściwymi atrybutami
<input 
  type="text"
  id="name"
  name="name"
  className="form-control"
  required  // Jeśli walidacja potrzebna
/>
```

## 6. Błędy Logiki i Walidacji

**Opis:** Błędy logiki i walidacji występują, gdy studenci nie implementują właściwej walidacji danych wejściowych lub nie przestrzegają dokładnych wymagań dla wyjścia konsoli. Te błędy mogą powodować awarię aplikacji, zapewniać niepoprawne informacje zwrotne lub nie spełniać specyfikacji egzaminu. Walidacja jest kluczowa dla obsługi przypadków brzegowych i błędów użytkownika.

### Niekompletna Walidacja
```javascript
// ❌ BŁĘDNE - Sprawdza tylko czy kurs istnieje, nie czy dane wejściowe są ważne
const courseNumber = parseInt(userInput);
if (courses[courseNumber - 1]) {
  console.log(courses[courseNumber - 1]);
}

// ✅ POPRAWNE - Kompleksowa walidacja
const courseNumber = parseInt(userInput);
if (isNaN(courseNumber) || courseNumber < 1 || courseNumber > courses.length) {
  console.log("Nieprawidłowy numer kursu");
} else {
  console.log(courses[courseNumber - 1]);
}
```

### Błędny Format Wyjścia Konsoli
```javascript
// ❌ BŁĘDNE - Nie pasuje do wymagań egzaminu
console.log(`Student: ${name}, Course: ${course}`);

// ✅ POPRAWNE - Osobne logi jak wymagane
console.log(name);
console.log(course);
```

### Niepoprawny Komunikat Błędu
```javascript
// ❌ BŁĘDNE - Inny komunikat błędu niż określony
console.log("Invalid course number");
console.log("Błędny numer kursu");

// ✅ POPRAWNE - Dokładny komunikat z wymagań
console.log("Nieprawidłowy numer kursu");
```

## 7. Błędy Struktury Komponentu

**Opis:** Błędy struktury komponentu występują, gdy studenci błędnie rozumieją wymagania egzaminu lub nadmiernie inżynierują rozwiązanie. Zadanie szczególnie wymaga pojedynczego komponentu, ale studenci często tworzą wiele komponentów lub pomijają wymagane elementy. Te błędy mogą skutkować nie spełnieniem podstawowych wymagań egzaminu.

### Wiele Komponentów Zamiast Pojedynczego
```javascript
// ❌ BŁĘDNE - Zadanie wymaga pojedynczego komponentu
function CourseList() { /* ... */ }
function CourseForm() { /* ... */ }
function App() {
  return (
    <>
      <CourseList />
      <CourseForm />
    </>
  );
}

// ✅ POPRAWNE - Pojedynczy komponent jak wymagane
function App() {
  // Cała logika i JSX w jednym komponencie
  return (
    <div>
      <h2>Liczba kursów: {courses.length}</h2>
      <ol>{/* lista kursów */}</ol>
      <form>{/* elementy formularza */}</form>
    </div>
  );
}
```

### Brak Wymaganych Elementów
```javascript
// ❌ BŁĘDNE - Brak wymaganego nagłówka H2
return (
  <div>
    <h1>Kursy</h1>  {/* Błędny poziom nagłówka */}
    <ul>{/* Powinno być <ol> */}</ul>
    {/* Brak formularza */}
  </div>
);

// ✅ POPRAWNE - Wszystkie wymagane elementy
return (
  <div>
    <h2>Liczba kursów: {courses.length}</h2>  {/* Poprawny nagłówek */}
    <ol>{/* Numerowana lista */}</ol>
    <form>{/* Formularz ze wszystkimi wymaganymi polami */}</form>
  </div>
);
```

## 8. Błędy Stylu Kodowania

**Opis:** Błędy stylu kodowania, choć nie zawsze są błędami funkcjonalnymi, mogą znacząco wpłynąć na czytelność kodu, możliwość utrzymania i wrażenie egzaminatora. Słabe nazewnictwo zmiennych, niespójne formatowanie i brak komentarzy utrudniają zrozumienie kodu i mogą prowadzić do błędów logicznych. Dobre praktyki kodowania demonstrują kompetencje programistyczne.

### Słabe Nazewnictwo Zmiennych
```javascript
// ❌ BŁĘDNE - Nieopisowe nazwy
const [n, setN] = useState('');
const [c, setC] = useState(0);
const arr = ['Course 1', 'Course 2'];

// ✅ POPRAWNE - Znaczące nazwy
const [nameAndSurname, setNameAndSurname] = useState('');
const [courseNumber, setCourseNumber] = useState(0);
const courses = ['Course 1', 'Course 2'];
```

### Niespójne Formatowanie
```javascript
// ❌ BŁĘDNE - Niespójne wcięcia i odstępy
function App(){
const[name,setName]=useState('');
  return(
<div>
<h2>Title</h2>
</div>
  );
}

// ✅ POPRAWNE - Spójne formatowanie
function App() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <h2>Title</h2>
    </div>
  );
}
```
