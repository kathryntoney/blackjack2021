// Selections
const deal = document.querySelector(".dealButton");
const player = document.querySelector(".player");
const dealer = document.querySelector(".dealer");
const otherButtonsContainer = document.querySelector(".otherButtons");
const container = document.querySelector(".container");

// Arrays
const cardList = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
const cardSuits = ["Spades", "Diamonds", "Clubs", "Hearts"];
let currentPlayerHand = [];
let currentDealerHand = [];

// Functions
function dealCards() {
  const hand2 = {
    suit: "",
    value: "",
  };
  const randomSuit = Math.floor(Math.random() * cardSuits.length);
  const randomCardList = Math.floor(Math.random() * cardList.length);
  hand2.suit = cardSuits[randomSuit];
  hand2.value = cardList[randomCardList];
  return hand2;
}

function convertStrings(playerObject, dealerObject) {
  if (
    dealerObject.value === "Jack" ||
    dealerObject.value === "Queen" ||
    dealerObject.value === "King"
  ) {
    dealerObject.value = 10;
  } else if (dealerObject.value === "Ace") {
    dealerObject.value = 11;
  } else {
    dealerObject.value = parseInt(dealerObject.value);
  }
  if (
    playerObject.value === "Jack" ||
    playerObject.value === "Queen" ||
    playerObject.value === "King"
  ) {
    playerObject.value = 10;
  } else if (playerObject.value === "Ace") {
    playerObject.value = 11;
  } else {
    playerObject.value = parseInt(playerObject.value);
  }
}

function addPlayerImages(playerObject) {
  const playerHandElement = document.createElement("img");
  playerHandElement.className = "playerCards";
  playerHandElement.src = `./images/${
    playerObject.value
  }_of_${playerObject.suit.toLowerCase()}.png`;
  player.append(playerHandElement);
}

function addDealerImages(dealerObject) {
  const dealerHandElement = document.createElement("img");
  dealerHandElement.className = "dealerCards";
  dealerHandElement.src = `./images/${
    dealerObject.value
  }_of_${dealerObject.suit.toLowerCase()}.png`;
  dealer.append(dealerHandElement);
}

function startGame() {
  const dealerHand = dealCards();
  const playerHand = dealCards();
  addPlayerImages(playerHand);
  addDealerImages(dealerHand);
  convertStrings(playerHand, dealerHand);
  currentDealerHand.push(dealerHand);
  currentPlayerHand.push(playerHand);
}

function printPlayerTotal(element, playerTotal) {
  element.innerText = `Player's current total is: ${playerTotal}`;
}

function printDealerTotal(element, dealerTotal) {
  element.innerText = `Dealer's current total is: ${dealerTotal}`;
}

function restartGame(playerTotal, dealerTotal, hitButton, standButton) {
  container.append(deal);
  playerTotal = 0;
  dealerTotal = 0;
  hitButton.remove();
  standButton.remove();
  player.innerHTML = "";
  dealer.innerHTML = "";
  currentDealerHand = [];
  currentPlayerHand = [];
}

function printWinOrLose(playerTotal, dealerTotal, hitButton, standButton) {
  if (playerTotal > 21) {
    window.alert(`YOUR SCORE HIT ${playerTotal}... YOU LOST :(`);
    restartGame(playerTotal, dealerTotal, hitButton, standButton);
  } else if (dealerTotal === 21) {
    window.alert(`DEALER'S SCORE IS ${dealerTotal}... YOU LOST :(`);
    restartGame(playerTotal, dealerTotal, hitButton, standButton);
  } else if (dealerTotal > 21) {
    window.alert(`DEALER'S SCORE HIT ${dealerTotal}!! YOU WON :)`);
    restartGame(playerTotal, dealerTotal, hitButton, standButton);
  } else if (playerTotal === 21) {
    window.alert(`YOUR SCORE IS ${playerTotal}!! YOU WON!! :)`);
    restartGame(playerTotal, dealerTotal, hitButton, standButton);
  }
}

// Event Listeners
deal.addEventListener("click", () => {
  startGame();
  startGame();
  let currentPlayerTotal =
    currentPlayerHand[0].value + currentPlayerHand[1].value;
  let currentDealerTotal =
    currentDealerHand[0].value + currentDealerHand[1].value;
  let playerTotalElement = document.createElement("p");
  let dealerTotalElement = document.createElement("p");
  printPlayerTotal(playerTotalElement, currentPlayerTotal);
  printDealerTotal(dealerTotalElement, currentDealerTotal);
  player.append(playerTotalElement);
  dealer.append(dealerTotalElement);
  let hitButton = document.createElement("button");
  hitButton.innerText = "HIT";
  hitButton.className = "hitButton";
  let standButton = document.createElement("button");
  standButton.innerText = "STAND";
  standButton.className = "standButton";
  otherButtonsContainer.append(hitButton);
  otherButtonsContainer.append(standButton);
  deal.remove();
  console.log("current player hand: ", currentPlayerHand);
  console.log("starting player total: ", currentPlayerTotal);
  console.log("current dealer hand: ", currentDealerHand);
  console.log("starting dealer total: ", currentDealerTotal);
  hitButton.addEventListener("click", () => {
    const playerHand = dealCards();
    addPlayerImages(playerHand);
    convertStrings(playerHand, "");
    currentPlayerHand.push(playerHand);
    currentPlayerTotal += playerHand.value;
    printPlayerTotal(playerTotalElement, currentPlayerTotal);
    printWinOrLose(
      currentPlayerTotal,
      currentDealerTotal,
      hitButton,
      standButton
    );
  });
  standButton.addEventListener("click", () => {
    const dealerHand = dealCards();
    addDealerImages(dealerHand);
    convertStrings(dealerHand, "");
    currentDealerHand.push(dealerHand);
    currentDealerTotal += dealerHand.value;
    printDealerTotal(dealerTotalElement, currentDealerTotal);
    printWinOrLose(
      currentPlayerTotal,
      currentDealerTotal,
      hitButton,
      standButton
    );
  });
});