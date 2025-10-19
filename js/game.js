const cardImages = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  "image9.jpg",
  "image10.jpg",
  "image11.jpg",
  "image12.jpg",
  "image13.jpg",
  "image14.jpg",
  "image15.jpg",
  "image16.jpg",
  "image17.jpg",
  "image18.jpg",
  "image19.jpg",
  "image20.jpg",
  "image21.jpg",
  "image22.jpg",
  "image23.jpg",
  "image24.jpg",
  "image25.jpg",
];

let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 25;

// Создаем массив с парными картинками
const gameCards = [...cardImages, ...cardImages];

// Перемешиваем карты
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Создаем игровое поле
function createGameBoard() {
  const gameBoard = document.getElementById("gameBoard");
  const shuffledCards = shuffleCards([...gameCards]);

  shuffledCards.forEach((image, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.image = image;
    card.dataset.index = index;

    card.innerHTML = `
                  <div class="card-inner">
                      <div class="card-front">
                          <img src="images/${image}" alt="Card">
                      </div>
                      <div class="card-back"></div>
                  </div>
              `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Логика переворота карты
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

// Проверка совпадения
function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.image === card2.dataset.image;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  flippedCards.forEach((card) => {
    card.style.pointerEvents = "none";
  });
  flippedCards = [];
  matchedPairs++;

  if (matchedPairs === totalPairs) {
    setTimeout(() => alert("Поздравляем! Вы нашли все пары!"), 300);
  }
}

function unflipCards() {
  flippedCards.forEach((card) => {
    card.classList.remove("flipped");
  });
  flippedCards = [];
}

// Инициализация игры
createGameBoard();