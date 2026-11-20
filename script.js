const wordForm = document.getElementById("wordForm");
const englishInput = document.getElementById("englishInput");
const hebrewInput = document.getElementById("hebrewInput");
const wordList = document.getElementById("wordList");

let cards = loadCards();

// Loads saved cards from localStorage.
function loadCards() {
  const savedCards = localStorage.getItem("flashcards");
  if (savedCards === null) {
    return [];
  }
  return JSON.parse(savedCards);
}

// Saves cards in localStorage.
function saveCards() {
  localStorage.setItem("flashcards", JSON.stringify(cards));
}

// Shows all saved word pairs sorted by their English words.
function showWordList() {
  wordList.textContent = "";
  const sortedCards = cards.slice();
  sortedCards.sort(function (firstCard, secondCard) {
    return firstCard.english.localeCompare(secondCard.english);
  });

  for (let cardIndex = 0; cardIndex < sortedCards.length; cardIndex++) {
    const listItem = document.createElement("li");
    listItem.textContent = sortedCards[cardIndex].english + " - " +
      sortedCards[cardIndex].hebrew;
    wordList.appendChild(listItem);
  }
}

// Adds a new word pair and clears the form.
function addWordPair(event) {
  event.preventDefault();
  const english = englishInput.value.trim();
  const hebrew = hebrewInput.value.trim();

  if (english === "" || hebrew === "") {
    return;
  }

  cards.push({
    english: english,
    hebrew: hebrew
  });
  saveCards();
  wordForm.reset();
}

if (wordForm !== null) {
  wordForm.addEventListener("submit", addWordPair);
}
if (wordList !== null) {
  showWordList();
}