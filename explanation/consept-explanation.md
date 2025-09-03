# Wyjaśnienia Koncepcji dla "Część II. Aplikacja Web"

**Egzamin docelowy**: INF.04-02-22.06-SG - Rozwój Aplikacji Web w React.js

Ten dokument wyjaśnia wszystkie fundamentalne koncepcje wymagane do pomyślnej implementacji części aplikacji web egzaminu. Koncepcje są zorganizowane od podstawowych do zaawansowanych dla optymalnej progresji uczenia się.

---

## 1. Podstawowe Koncepcje Rozwoju Web

### 1.1 Struktura HTML i Elementy Semantyczne

**Czym jest**: HTML zapewnia strukturalne fundamenty dla aplikacji web. Egzamin wymaga określonych elementów HTML z właściwym znaczeniem semantycznym.

**Kluczowe Elementy dla Egzaminu**:
- `<h2>` - Nagłówek drugiego stopnia (wymaganie R.3.5)
- `<ol>` - Lista numerowana dla numerowanej listy kursów (wymaganie R.3.6)  
- `<li>` - Elementy listy dla poszczególnych kursów
- `<form>` - Kontener formularza dla danych użytkownika
- `<label>` - Etykiety pól formularza dla dostępności
- `<input>` - Pola wprowadzania danych
- `<button>` - Przycisk wysyłania dla akcji formularza

**Przykład**:
```html
<div>
  <h2>Liczba kursów: 3</h2>
  <ol>
    <li>Programowanie w C#</li>
    <li>Angular dla początkujących</li>
    <li>Kurs Django</li>
  </ol>
  <form>
    <div class="form-group">
      <label for="imieNazw">Imię i nazwisko:</label>
      <input id="imieNazw" type="text" class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Zapisz do kursu</button>
  </form>
</div>
```

**Dlaczego to ważne**: Właściwa struktura HTML zapewnia dostępność, SEO i spełnia wymagania egzaminu R.3.2, R.3.5, R.3.6.

### 1.2 Integracja Framework CSS (Bootstrap)

**Czym jest**: Bootstrap to framework CSS, który zapewnia wstępnie zbudowane klasy stylowania. Egzamin szczególnie wymaga klas Bootstrap.

**Wymagane Klasy Bootstrap**:
- `form-group` - Grupuje elementy formularza razem (R.3.2)
- `form-control` - Styluje pola wprowadzania (R.3.2)
- `btn btn-primary` - Stylowanie głównego przycisku (R.3.4)

**Przykład**:
```html
<!-- WYMAGANE: Struktura formularza Bootstrap -->
<div class="form-group">
  <label htmlFor="imieNazw">Imię i nazwisko:</label>
  <input id="imieNazw" type="text" className="form-control" />
</div>
<button type="submit" className="btn btn-primary">
  Zapisz do kursu
</button>
```

**Dlaczego to ważne**: Klasy Bootstrap są wyraźnie testowane w R.3.2 i R.3.4. Brak tych klas skutkuje utratą punktów.

### 1.3 Dostępność Formularza i Asocjacja Etykiet

**Czym jest**: Właściwa dostępność formularza zapewnia, że czytniki ekranu i inne technologie wspomagające mogą zrozumieć strukturę formularza.

**Kluczowe Koncepcje**:
- Atrybut `htmlFor` (React) / atrybut `for` (HTML) łączy etykiety z polami wprowadzania
- Atrybut `id` na polach wprowadzania zapewnia unikalną identyfikację
- Znaczące nazwy dla kontrolek formularza (wymaganie R.3.3)

**Przykład**:
```jsx
// POPRAWNE: Właściwa asocjacja etykiet
<label htmlFor="imieNazw">Imię i nazwisko:</label>
<input id="imieNazw" type="text" className="form-control" />

// BŁĘDNE: Brak asocjacji
<label>Imię i nazwisko:</label>
<input type="text" className="form-control" />
```

**Dlaczego to ważne**: R.3.3 szczególnie testuje znaczące nazwy kontrolek i właściwe asocjacje.

---

## 2. Podstawy JavaScript

### 2.1 Tablice i Metody Tablicowe

**Czym jest**: Tablice przechowują kolekcje danych. Egzamin wymaga pracy z tablicą kursów i wyświetlania jej zawartości.

**Kluczowe Koncepcje Tablic**:
- Deklaracja i inicjalizacja tablicy
- Indeksowanie tablic (0-podstawowe vs 1-podstawowe dane użytkownika)
- Właściwość długości tablicy
- Metoda Array.map() do renderowania list

**Przykład**:
```javascript
// Deklaracja tablicy (wymaganie R.3.1)
const courses = [
  'Programowanie w C#',
  'Angular dla początkujących', 
  'Kurs Django'
];

// Długość tablicy do wyświetlenia (R.3.5)
console.log(`Liczba kursów: ${courses.length}`); // Wynik: 3

// Indeksowanie tablicy (walidacja R.3.9)
const userInput = 2; // Użytkownik wprowadza 2
const courseIndex = userInput - 1; // Konwersja na 0-podstawowe: 1
const selectedCourse = courses[courseIndex]; // "Angular dla początkujących"

// Mapowanie tablicy do wyświetlenia (R.3.6)
courses.map((course, index) => (
  <li key={index}>{course}</li>
))
```

**Częsta Pułapka**: Błędy off-by-one przy konwersji danych użytkownika (1-podstawowe) na indeksy tablicy (0-podstawowe).

**Dlaczego to ważne**: Manipulacja tablicami jest kluczowa dla wymagań R.3.1, R.3.5, R.3.6 i R.3.9.

### 2.2 Obsługa Zdarzeń

**Czym jest**: Obsługa zdarzeń pozwala aplikacji reagować na interakcje użytkownika, takie jak wysyłanie formularzy i zmiany pól wprowadzania.

**Kluczowe Typy Zdarzeń**:
- `onSubmit` - Zdarzenia wysyłania formularza (R.3.7)
- `onChange` - Zmiany pól wprowadzania
- `preventDefault()` - Zapobiega domyślnemu zachowaniu przeglądarki

**Przykład**:
```javascript
// Obsługa wysyłania formularza (wymaganie R.3.7)
const handleSubmit = (event) => {
  event.preventDefault(); // KRYTYCZNE: Zapobiega przeładowaniu strony
  
  // Dostęp do danych formularza
  const name = nameRef.current.value;
  const courseNumber = parseInt(courseNumberRef.current.value);
  
  // Wyjście konsoli zgodnie z wymaganiami (R.3.9)
  console.log(name);
  if (courses[courseNumber - 1]) {
    console.log(courses[courseNumber - 1]);
  } else {
    console.log("Nieprawidłowy numer kursu");
  }
};

// Obsługa zmiany pola wprowadzania
const handleNameChange = (event) => {
  setName(event.target.value);
};
```

**Dlaczego to ważne**: R.3.7 szczególnie testuje obsługę wysyłania formularza, a R.3.9 wymaga dokładnego formatu wyjścia konsoli.

### 2.3 Konwersja Typów Danych i Walidacja

**Czym jest**: Konwersja ciągów danych użytkownika na odpowiednie typy danych i walidacja wprowadzania.

**Kluczowe Koncepcje**:
- `parseInt()` - Konwertuje ciąg na liczbę całkowitą
- `Number()` - Konwertuje na liczbę
- Logika walidacji dla granic tablicy
- Sprawdzanie typu z `isNaN()`

**Przykład**:
```javascript
// Walidacja danych użytkownika (wymaganie R.3.9)
const handleSubmit = (event) => {
  event.preventDefault();
  
  const name = event.target.name.value;
  const courseNumberStr = event.target.courseNumber.value;
  
  // Konwersja ciągu na liczbę
  const courseNumber = parseInt(courseNumberStr);
  
  console.log(name); // Pierwsze wyjście
  
  // Logika walidacji
  if (isNaN(courseNumber) || courseNumber < 1 || courseNumber > courses.length) {
    console.log("Nieprawidłowy numer kursu");
  } else {
    console.log(courses[courseNumber - 1]);
  }
};
```

**Dlaczego to ważne**: Właściwa walidacja zapewnia dokładne spełnienie wymagań R.3.9.

---

## 3. Podstawowe Koncepcje React.js

### 3.1 Komponenty Funkcyjne

**Czym jest**: Komponenty funkcyjne to nowoczesny sposób React tworzenia komponentów używając funkcji zamiast klas.

**Kluczowe Koncepcje**:
- Deklaracja funkcji
- Instrukcja return JSX
- Właściwości komponentu (jeśli potrzebne)
- Eksport komponentu

**Przykład**:
```jsx
// Struktura komponentu funkcyjnego (wymaganie R.3.1)
import { useState } from 'react';

function App() {
  // Logika komponentu tutaj
  
  return (
    <div>
      {/* Zawartość JSX */}
    </div>
  );
}

export default App; // Udostępnij komponent do importu
```

**Dlaczego to ważne**: R.3.1 wymaga pojedynczego komponentu, a nowoczesny React używa komponentów funkcyjnych.

### 3.2 JSX (JavaScript XML)

**Czym jest**: JSX pozwala pisać składnię podobną do HTML w JavaScript. To standardowy sposób opisywania UI w React.

**Kluczowe Reguły JSX**:
- Używaj `className` zamiast `class`
- Używaj `htmlFor` zamiast `for`
- Tagi samozamykające potrzebują `/>`
- Wyrażenia JavaScript w `{}`
- CamelCase dla obsługi zdarzeń

**Przykład**:
```jsx
// JSX z atrybutami specyficznymi dla React
<div className="form-group"> {/* className, nie class */}
  <label htmlFor="imieNazw">Imię i nazwisko:</label> {/* htmlFor, nie for */}
  <input 
    id="imieNazw"
    type="text" 
    className="form-control"
    value={name} {/* Wyrażenie JavaScript */}
    onChange={handleNameChange} {/* camelCase obsługa zdarzenia */}
  />
</div>

{/* Wyrażenia JavaScript dla dynamicznej zawartości */}
<h2>Liczba kursów: {courses.length}</h2>

{/* Mapowanie tablicy w JSX */}
<ol>
  {courses.map((course, index) => (
    <li key={index}>{course}</li>
  ))}
</ol>
```

**Dlaczego to ważne**: JSX jest wymagany dla komponentów React i ma specyficzne reguły składni, które wpływają na wymagania egzaminu.

### 3.3 React Hooks - useState

**Czym jest**: `useState` to hook React, który pozwala komponentom funkcyjnym mieć stan (dane, które mogą się zmieniać w czasie).

**Kluczowe Koncepcje**:
- Deklaracja stanu z wartością początkową
- Getter i setter stanu
- Aktualizacje stanu wywołują ponowne renderowanie
- Komponenty kontrolowane vs niekontrolowane

**Przykład**:
```jsx
import { useState } from 'react';

function App() {
  // Stan dla danych kursów (R.3.1)
  const [courses] = useState([
    'Programowanie w C#',
    'Angular dla początkujących',
    'Kurs Django'
  ]);
  
  // Stan dla pól formularza
  const [nameAndSurname, setNameAndSurname] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  
  // Obsługa zdarzeń, które aktualizują stan
  const handleNameChange = (event) => {
    setNameAndSurname(event.target.value);
  };
  
  const handleCourseNumberChange = (event) => {
    setCourseNumber(event.target.value);
  };
  
  return (
    <div>
      {/* Stan używany w JSX */}
      <h2>Liczba kursów: {courses.length}</h2>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={nameAndSurname} {/* Komponent kontrolowany */}
          onChange={handleNameChange}
        />
        <input 
          type="number"
          value={courseNumber} {/* Komponent kontrolowany */}
          onChange={handleCourseNumberChange}
        />
      </form>
    </div>
  );
}
```

**Dlaczego to ważne**: `useState` to preferowany sposób zarządzania stanem w nowoczesnym React i demonstruje kompetencje React oczekiwane na egzaminie.

### 3.4 React Hooks - useRef (Podejście Alternatywne)

**Czym jest**: `useRef` zapewnia bezpośredni dostęp do elementów DOM, pozwalając na wzorce komponentów niekontrolowanych.

**Kluczowe Koncepcje**:
- Tworzenie i przypisanie referencji
- Dostęp do wartości DOM z `.current.value`
- Brak ponownego renderowania przy zmianach wartości
- Bezpośrednia manipulacja DOM

**Przykład**:
```jsx
import { useRef } from 'react';

function App() {
  // Twórz referencje dla pól formularza
  const nameRef = useRef();
  const courseNumberRef = useRef();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Dostęp do wartości bezpośrednio z DOM
    const name = nameRef.current.value;
    const courseNumber = parseInt(courseNumberRef.current.value);
    
    console.log(name);
    // Logika walidacji...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        ref={nameRef} {/* Dołącz referencję do elementu DOM */}
        type="text"
      />
      <input 
        ref={courseNumberRef}
        type="number"
      />
    </form>
  );
}
```

**Kiedy używać**: `useRef` działa dla prostych formularzy, ale `useState` lepiej demonstruje znajomość React.

### 3.5 Cykl Życia Komponentu i Renderowanie

**Czym jest**: Zrozumienie, jak komponenty React renderują się i ponownie renderują na podstawie zmian stanu.

**Kluczowe Koncepcje**:
- Początkowe renderowanie
- Ponowne renderowanie wywołane zmianami stanu
- Wirtualny DOM i rekonsyliacja
- Właściwości key dla elementów listy

**Przykład**:
```jsx
function App() {
  const [courses] = useState([...]);
  const [name, setName] = useState('');
  
  // Ten komponent ponownie renderuje się, gdy zmienia się stan 'name'
  return (
    <div>
      <h2>Hello {name}</h2> {/* Aktualizuje się, gdy zmienia się name */}
      
      {/* Właściwość key wymagana dla elementów listy (R.3.6) */}
      <ol>
        {courses.map((course, index) => (
          <li key={index}>{course}</li> {/* Key zapobiega problemom z renderowaniem */}
        ))}
      </ol>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)} {/* Wywołuje ponowne renderowanie */}
      />
    </div>
  );
}
```

**Dlaczego to ważne**: Zrozumienie renderowania pomaga debugować problemy i zapewnia właściwe renderowanie listy dla R.3.6.

---

## 4. Wzorce Obsługi Formularzy

### 4.1 Komponenty Kontrolowane

**Czym jest**: Pola formularza, których wartości są kontrolowane przez stan React.

**Kluczowe Charakterystyki**:
- Wartość pola pochodzi ze stanu
- Zmiany obsługiwane przez obsługę zdarzeń
- Stan jest jedynym źródłem prawdy
- Możliwa walidacja w czasie rzeczywistym

**Przykład**:
```jsx
function App() {
  const [formData, setFormData] = useState({
    name: '',
    courseNumber: ''
  });
  
  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };
  
  return (
    <form>
      <input 
        type="text"
        value={formData.name} {/* Kontrolowane przez stan */}
        onChange={handleInputChange('name')}
      />
      <input 
        type="number"
        value={formData.courseNumber} {/* Kontrolowane przez stan */}
        onChange={handleInputChange('courseNumber')}
      />
    </form>
  );
}
```

**Zalety**: Pełna kontrola nad stanem formularza, łatwa walidacja, przewidywalne zachowanie.

### 4.2 Komponenty Niekontrolowane

**Czym jest**: Pola formularza, które zarządzają własnym stanem wewnętrznie, dostępne przez referencje.

**Kluczowe Charakterystyki**:
- DOM zarządza stanem pola
- Dostęp do wartości tylko gdy potrzebne
- Mniej React-podobne, ale prostsze
- Dobre dla prostych formularzy

**Przykład**:
```jsx
function App() {
  const nameRef = useRef();
  const courseNumberRef = useRef();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Dostęp do wartości z DOM
    const name = nameRef.current.value;
    const courseNumber = courseNumberRef.current.value;
    
    // Przetwarzanie danych formularza...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" />
      <input ref={courseNumberRef} type="number" />
    </form>
  );
}
```

**Kiedy używać**: Proste formularze, gdzie nie potrzebujesz walidacji w czasie rzeczywistym lub aktualizacji stanu.

### 4.3 Wzorce Walidacji Formularzy

**Czym jest**: Różne podejścia do walidacji danych użytkownika i zapewnienia informacji zwrotnej.

**Podejścia do Walidacji**:

**1. Walidacja Indeksu Tablicy (Zalecane dla Egzaminu)**:
```javascript
const handleSubmit = (event) => {
  event.preventDefault();
  const courseNumber = parseInt(event.target.courseNumber.value);
  
  console.log(name);
  
  // Proste sprawdzanie granic
  if (courses[courseNumber - 1]) {
    console.log(courses[courseNumber - 1]);
  } else {
    console.log("Nieprawidłowy numer kursu");
  }
};
```

**2. Jawne Sprawdzanie Zakresu**:
```javascript
const handleSubmit = (event) => {
  event.preventDefault();
  const courseNumber = parseInt(event.target.courseNumber.value);
  
  console.log(name);
  
  // Jawne sprawdzanie zakresu
  if (courseNumber >= 1 && courseNumber <= courses.length) {
    console.log(courses[courseNumber - 1]);
  } else {
    console.log("Nieprawidłowy numer kursu");
  }
};
```

**Dlaczego to ważne**: R.3.9 wymaga dokładnej logiki walidacji i formatu wyjścia konsoli.

---

## 5. Koncepcje Środowiska Programistycznego

### 5.1 Struktura Projektu React

**Czym jest**: Zrozumienie, jak są zorganizowane projekty React i które pliki modyfikować.

**Kluczowe Pliki**:
- `src/App.js` - Główny komponent aplikacji
- `src/index.js` - Punkt wejścia aplikacji
- `public/index.html` - Szablon HTML
- `package.json` - Zależności i skrypty

**Przykładowa Struktura Projektu**:
```
my-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          ← Główny komponent (modyfikuj ten)
│   ├── index.js        ← Punkt wejścia
│   └── App.css         ← Stylowanie (opcjonalne)
├── package.json        ← Zależności
└── README.md
```

**Co modyfikować**: Głównie `App.js` dla wymagań egzaminu.

### 5.2 NPM i Zarządzanie Pakietami

**Czym jest**: Node Package Manager obsługuje zależności i skrypty projektu.

**Kluczowe Komendy**:
- `npm install` - Instaluj zależności
- `npm start` - Uruchom serwer deweloperski
- `npm run build` - Zbuduj dla produkcji

**Kluczowe Zależności dla Egzaminu**:
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "bootstrap": "^5.1.3"
  }
}
```

**Dlaczego to ważne**: Zrozumienie konfiguracji projektu pomaga z R.3.8 (aplikacja działa bez błędów).

### 5.3 System Import/Export

**Czym jest**: Moduły ES6 pozwalają importować i eksportować kod między plikami.

**Kluczowe Typy Importu**:
```javascript
// Importy domyślne
import React from 'react';
import App from './App';

// Importy nazwane
import { useState, useRef } from 'react';

// Importy CSS
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
```

**Przykłady Exportu**:
```javascript
// Export domyślny (jeden na plik)
export default App;

// Exporty nazwane (wiele na plik)
export const helper = () => {};
export const utils = {};
```

**Dlaczego to ważne**: Właściwe importy są wymagane dla hooków React i stylowania Bootstrap.

---

## 6. Narzędzia Deweloperskie Przeglądarki

### 6.1 Wyjście Konsoli i Debugowanie

**Czym jest**: Konsola przeglądarki wyświetla wyjście JavaScript i błędy.

**Kluczowe Metody Konsoli**:
- `console.log()` - Wyświetla wartości (wymaganie R.3.9)
- `console.error()` - Wyświetla błędy
- `console.warn()` - Wyświetla ostrzeżenia

**Przykład**:
```javascript
// Wymagany format wyjścia konsoli (R.3.9)
const handleSubmit = (event) => {
  event.preventDefault();
  
  // Pierwszy log: imię i nazwisko studenta
  console.log("Jan Kowalski");
  
  // Drugi log: nazwa kursu lub błąd
  console.log("Programowanie w C#");
  // LUB
  console.log("Nieprawidłowy numer kursu");
};
```

**Jak uzyskać dostęp**: F12 → Zakładka Console w większości przeglądarek.

**Dlaczego to ważne**: R.3.9 szczególnie testuje format wyjścia konsoli.

### 6.2 Inspekcja Elementów

**Czym jest**: Sprawdzanie struktury HTML i stylowania CSS w przeglądarce.

**Kluczowe Zastosowania**:
- Weryfikacja, czy klasy Bootstrap są zastosowane
- Sprawdzanie struktury formularza
- Debugowanie problemów ze stylowaniem
- Walidacja semantyki HTML

**Jak uzyskać dostęp**: F12 → Zakładka Elements, lub prawy klik → Inspect Element.

**Dlaczego to ważne**: Pomaga weryfikować R.3.2 (klasy Bootstrap) i R.3.3 (znaczące nazwy).

---

## 7. Wspólne Wzorce i Najlepsze Praktyki

### 7.1 Zapobieganie Błędom

**Częste Błędy do Uniknięcia**:

**1. Brak preventDefault()**:
```javascript
// BŁĘDNE: Strona się przeładuje
const handleSubmit = (event) => {
  console.log("Formularz wysłany");
};

// POPRAWNE: Zapobiegaj przeładowaniu strony
const handleSubmit = (event) => {
  event.preventDefault();
  console.log("Formularz wysłany");
};
```

**2. Błędy off-by-one**:
```javascript
// BŁĘDNE: Bezpośredni dostęp do tablicy
if (courses[courseNumber]) {
  console.log(courses[courseNumber]);
}

// POPRAWNE: Konwertuj 1-podstawowe na 0-podstawowe
if (courses[courseNumber - 1]) {
  console.log(courses[courseNumber - 1]);
}
```

**3. Brak właściwości key**:
```jsx
// BŁĘDNE: Brak właściwości key
{courses.map(course => <li>{course}</li>)}

// POPRAWNE: Właściwość key dołączona
{courses.map((course, index) => <li key={index}>{course}</li>)}
```

### 7.2 Standardy Jakości Kodu

**Wymagania z R.1.1-R.1.6**:

**1. Czytelna Struktura Kodu**:
```javascript
// DOBRE: Jasne formatowanie
const handleSubmit = (event) => {
  event.preventDefault();
  
  const name = nameRef.current.value;
  const courseNumber = parseInt(courseNumberRef.current.value);
  
  console.log(name);
  
  if (courses[courseNumber - 1]) {
    console.log(courses[courseNumber - 1]);
  } else {
    console.log("Nieprawidłowy numer kursu");
  }
};

// ZŁE: Słabe formatowanie
const handleSubmit=(event)=>{event.preventDefault();const name=nameRef.current.value;console.log(name);}
```

**2. Znaczące Nazwy Zmiennych**:
```javascript
// DOBRE: Opisowe nazwy
const [nameAndSurname, setNameAndSurname] = useState('');
const [courseNumber, setCourseNumber] = useState('');

// ZŁE: Ogólne nazwy
const [n, setN] = useState('');
const [x, setX] = useState('');
```

### 7.3 Wymagania Specyficzne dla Egzaminu

**Krytyczne Punkty Implementacji**:

**1. Dokładne Nazwy Kursów**:
```javascript
// WYMAGANE: Dokładne nazwy jak określono
const [courses] = useState([
  'Programowanie w C#',           // Musi być dokładne
  'Angular dla początkujących',   // Musi być dokładne
  'Kurs Django'                   // Musi być dokładne
]);
```

**2. Właściwe Klasy Bootstrap**:
```jsx
// WYMAGANE: Dokładna struktura Bootstrap
<div className="form-group">
  <label htmlFor="imieNazw">Imię i nazwisko:</label>
  <input 
    id="imieNazw" 
    type="text" 
    className="form-control" 
  />
</div>
<button type="submit" className="btn btn-primary">
  Zapisz do kursu
</button>
```

**3. Format Wyjścia Konsoli**:
```javascript
// WYMAGANE: Osobne logi konsoli
console.log(nameAndSurname);              // Najpierw: imię
console.log(courses[courseNumber - 1]);   // Potem: nazwa kursu
// LUB
console.log("Nieprawidłowy numer kursu"); // Dokładny komunikat błędu
```

---

## 8. Przewodnik Progresji Studiów

### Faza 1: Podstawy (Tydzień 1-2)
1. Struktura HTML i elementy semantyczne
2. Podstawy CSS i klasy Bootstrap
3. Tablice JavaScript i podstawowe operacje
4. Koncepcje obsługi zdarzeń

### Faza 2: Podstawy React (Tydzień 3-4)
1. Składnia JSX i reguły
2. Komponenty funkcyjne
3. Hook useState
4. Obsługa zdarzeń w React

### Faza 3: Obsługa Formularzy (Tydzień 5)
1. Komponenty kontrolowane vs niekontrolowane
2. Wzorce walidacji formularzy
3. Wymagania wyjścia konsoli

### Faza 4: Integracja (Tydzień 6)
1. Kompletne złożenie aplikacji
2. Integracja Bootstrap
3. Testowanie i debugowanie
4. Ulepszenia jakości kodu

### Faza 5: Przygotowanie do Egzaminu (Tydzień 7)
1. Ćwiczenie z dokładnymi wymaganiami egzaminu
2. Przegląd i optymalizacja kodu
3. Strategie zapobiegania błędom
4. Ćwiczenie zarządzania czasem

---

## 9. Szybka Lista Kontrolna Referencji

**Przed Dniem Egzaminu**:
- [ ] Potrafię utworzyć funkcjonalny komponent React
- [ ] Potrafię poprawnie używać hooka useState
- [ ] Potrafię zaimplementować formularz z klasami Bootstrap
- [ ] Potrafię obsłużyć wysyłanie formularza z preventDefault()
- [ ] Potrafię poprawnie walidować indeksy tablicy
- [ ] Potrafię wyświetlić w konsoli w wymaganym formacie
- [ ] Potrafię mapować tablice na listy JSX z kluczami
- [ ] Potrafię używać znaczących nazw zmiennych
- [ ] Potrafię formatować kod czytelnie

**Podczas Implementacji**:
- [ ] Pojedynczy komponent (R.3.1)
- [ ] Bootstrap form-group i form-control (R.3.2)
- [ ] Znaczące ID jak "imieNazw", "numer" (R.3.3)
- [ ] Przycisk z "btn btn-primary" (R.3.4)
- [ ] H2 z courses.length (R.3.5)
- [ ] Lista numerowana ze wszystkimi kursami zmapowanymi (R.3.6)
- [ ] Obsługa onSubmit formularza (R.3.7)
- [ ] Aplikacja działa bez błędów (R.3.8)
- [ ] Poprawny format wyjścia konsoli (R.3.9)

Ten kompleksowy przewodnik obejmuje wszystkie koncepcje potrzebne do pomyślnej implementacji części aplikacji web egzaminu INF.04. Skup się na zrozumieniu "dlaczego" za każdą koncepcją, nie tylko "jak", aby zapewnić, że możesz dostosować się do wszelkich wariacji w pytaniach egzaminacyjnych.
