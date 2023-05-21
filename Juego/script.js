// Lista de palabras por nivel
const wordLists = [
  ['SAL', 'MESA', 'LAS', 'LA' ,'LES', 'MES', 'MAS', 'MAL', 'LE'], // Nivel 1
  ['REMO', 'AMOR', 'ROMA', 'AMO', 'LA', 'LE', 'REAL', 'RAMO', 'ARMO', 'ROL', 'OLER'], // Nivel 2
  ['DIJO', 'MUDO', 'DIA', 'MUDA', 'DUO', 'DADO'], // Nivel 3
  ['DEMOLER', 'LEER', 'DAME', 'DEME', 'MES', 'MAS', 'REMO', 'AMOR', 'ROMA', 'OLER','LEE', 'LA', 'LE', 'REAL'], // Nivel 4
  ['ANTES','SIENTO','ALETA','ALIENTO', 'TENSO','TIESO', 'SANTO', 'SANTA', 'TENIA', 'LISTA', 'LISTO', 'SON', 'NOS', 'TELA', 'LENTA', 'TIA', 'TIO','LIO'], // Nivel 5
  ['SUBE', 'LIBRO', 'LIBRE', 'SUR', 'USAR', 'BRISA', 'BAR', 'SER','CREO', 'CERO', 'SECO', 'SACO', 'CLARO'], // Nivel 6
  ['FEO', 'VIO', 'VEO', 'LES', 'SAL', 'LAS ', 'LUPA', 'FALSO', 'SUAVE', 'GUIA', 'PILA', 'FE', 'PULGA', ''], // Nivel 7
  ['HUESO', 'HUECO', 'HUMO', 'MESA', 'CUOTA', 'MAS', 'MES', 'TIESO', 'MESSI'], // Nivel 8
  ['RUTA', 'QUIERO', 'QUESO', 'QUEJA', 'RISA', 'SALTO', 'ALTO', 'TUERCA', 'ARCO', 'SUELO', 'CURA', 'ARTE'], // Nivel 9
  ['ARTE']  // Nivel 10
];

// Cantidad de palabras por nivel
const wordCounts = wordLists.map((wordList) => wordList.length);

// Letras disponibles por nivel
const availableLetters = [
  ['A', 'L', 'S', 'E', 'M'], // Nivel 1
  ['A', 'L', 'R', 'E', 'M', 'O'], // Nivel 2
  ['I', 'A', 'D', 'U', 'M', 'O', 'J'], // Nivel 3
  ['A', 'L', 'D', 'E', 'M', 'E', 'O', 'R'], // Nivel 4
  ['A', 'L', 'I', 'E', 'T', 'S', 'N', 'O', 'A'], // Nivel 5
  ['A', 'U', 'S', 'E', 'B', 'R', 'C', 'I', 'O', 'L'], // Nivel 6
  ['A', 'L', 'S', 'E', 'F', 'G', 'I', 'P', 'U', 'O', 'V'], // Nivel 7
  ['A', 'H', 'S', 'E', 'M', 'J', 'C', 'U', 'I', 'S', 'O', 'T'], // Nivel 8
  ['Q', 'L', 'S', 'U', 'E', 'A', 'R', 'U', 'I', 'T', 'J', 'O', 'C'], // Nivel 9
  ['A', 'R', 'G', 'E', 'N',  'T','I', 'N', 'A' ]  // Nivel 10
];

// Nivel actual
let currentLevel = 1;

// Palabras encontradas por el jugador
let foundWords = [];

// Letras seleccionadas por el jugador
let selectedLetters = [];

// Función para generar las letras aleatorias
function generateLetters() {
  const lettersContainer = document.getElementById('letters-container');
  lettersContainer.innerHTML = '';

  const letters = availableLetters[currentLevel - 1];
  letters.forEach((letter) => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');
    letterDiv.textContent = letter;

    letterDiv.addEventListener('click', () => {
      if (letterDiv.classList.contains('selected')) {
        letterDiv.classList.remove('selected');
        selectedLetters = selectedLetters.filter((selectedLetter) => selectedLetter !== letter);
      } else {
        letterDiv.classList.add('selected');
        selectedLetters.push(letter);
      }
    });

    lettersContainer.appendChild(letterDiv);
  });

  // Actualizar la cantidad de palabras en el nivel actual
  const wordCountElement = document.getElementById('word-count');
  wordCountElement.textContent = wordCounts[currentLevel - 1];
}

// Función para formar una palabra
function formWord() {
  const selectedWord = selectedLetters.join('');

  if (isValidWord(selectedWord)) {
    const wordsContainer = document.getElementById('words-container');
    const wordSpan = document.createElement('span');
    wordSpan.classList.add('word');
    wordSpan.textContent = selectedWord;
    wordsContainer.appendChild(wordSpan);

    foundWords.push(selectedWord);

    if (foundWords.length === wordCounts[currentLevel - 1]) {
      showCongratulationsModal(`¡Has completado el nivel ${currentLevel}! Pasas al siguiente nivel.`);

      const wordsContainer = document.getElementById('words-container');
      wordsContainer.innerHTML = '';

      currentLevel++;
      foundWords = [];

      if (currentLevel > 10) {
        showCongratulationsModal('¡Felicitaciones, has ganado el juego!');
        return;
      }

      generateLetters();
    }

    // Limpiar letras seleccionadas
    const selectedLetterDivs = document.querySelectorAll('.letter.selected');
    selectedLetterDivs.forEach((letterDiv) => {
      letterDiv.classList.remove('selected');
    });
    selectedLetters = [];
  } else {
    alert('Palabra no válida. Inténtalo de nuevo.');
  }
}

// Función para verificar si una palabra es válida
function isValidWord(word) {
  return wordLists[currentLevel - 1].includes(word);
}

// Función para mostrar el modal de felicitaciones
function showCongratulationsModal(message) {
  const modal = document.getElementById('congratulationsModal');
  const messageElement = document.getElementById('congratulationsMessage');
  messageElement.textContent = message;
  modal.style.display = 'block';
}

// Función para cerrar el modal de felicitaciones
function closeCongratulationsModal() {
  const modal = document.getElementById('congratulationsModal');
  modal.style.display = 'none';
}

// Inicialización del juego
generateLetters();

// Evento click para el botón "Formar Palabra"
const formWordButton = document.getElementById('form-word-button');
formWordButton.addEventListener('click', formWord);

// Evento click para cerrar el modal de felicitaciones
const closeCongratulationsButton = document.getElementsByClassName('close')[0];
closeCongratulationsButton.addEventListener('click', closeCongratulationsModal);
