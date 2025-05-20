const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  deck = shuffle(deck);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function dealCards() {
  const playerHand = [deck.pop(), deck.pop()];
  const computerHand = [deck.pop(), deck.pop()];
  const community = [
    deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()
  ];
  return { playerHand, computerHand, community };
}

function renderHand(containerId, cards) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = `${card.value}${card.suit}`;
    container.appendChild(cardDiv);
  });
}

function startGame() {
  document.getElementById("result").textContent = "";
  document.getElementById("computer-hand").classList.remove("hidden");

  createDeck();
  const { playerHand, computerHand, community } = dealCards();

  renderHand("player-hand", playerHand);
  renderHand("computer-hand", computerHand);
  renderHand("community-cards", community);

  setTimeout(() => {
    const winner = determineWinner(playerHand, computerHand, community);
    document.getElementById("result").textContent = winner;
  }, 1000);
}

// 🧪 Simples lógica de pontuação (apenas quem tem mais pares)
function determineWinner(player, computer, community) {
  const playerScore = countPairs([...player, ...community]);
  const computerScore = countPairs([...computer, ...community]);

  if (playerScore > computerScore) return "🏆 Você venceu!";
  if (computerScore > playerScore) return "🤖 Computador venceu!";
  return "🤝 Empate!";
}

function countPairs(cards) {
  const count = {};
  cards.forEach(card => {
    count[card.value] = (count[card.value] || 0) + 1;
  });

  let pairs = 0;
  for (let val in count) {
    if (count[val] === 2) pairs++;
    if (count[val] >= 3) pairs += 2; // trinca conta mais
  }
  return pairs;
}

startGame();
