const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
];

// When you want to flip values in a array randomly
cardArray.sort(() => 0.5 - Math.random());
console.log(cardArray);

const gridDisplay = document.querySelector("#grid");
// let's interact with a chosen card, here we go for an array cause we want to push content in it
let cardsChosen = [];
// let's push the cardsChosen ids in a different array
let cardsChosenIds = [];
// We want to collect how many matches we found
const cardsWon = [];
// display result
const resultDisplay = document.querySelector("#result");

console.log(gridDisplay);

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    // set img tag to each index and a default image
    card.setAttribute("src", "images/blank.png");
    // set a data id to each index
    card.setAttribute("data-id", i);
    console.log(card, i);
    // adding a event listener "callback" to detect that we had clicked the card to properly flip it with flipCard() then
    card.addEventListener("click", flipCard);
    // append the setted card to the front
    gridDisplay.append(card);
  }
}
// creating the board
createBoard();

// now we want flip the card on click

function flipCard() {
  console.log(cardArray);
  // On click we want the data-id
  // "this" means in "whatever" find the Attribute data-id
  const cardId = this.getAttribute("data-id");
  // we call our cardArray and we want to reach cardId and return it as you can see in console
  console.log(cardArray[cardId].name);
  // we push content in the array cardChosen, the "name" value
  cardsChosen.push(cardArray[cardId].name);
  // and the "id" value as well
  cardsChosenIds.push(cardId);
  console.log(cardsChosenIds);
  console.log(cardsChosen);
  console.log("clicked", cardId);
  // now we want to set the images to the corresponding data-id
  // as we previously attached an image to each card we are just setting it insted of the default blank.png
  this.setAttribute("src", cardArray[cardId].img);
  // now we want to start a comparison logic to see if the name is matching or not
  if (cardsChosen.length === 2) {
    // so the comparison is during only 5 seconds
    setTimeout(checkMatch, 500);
  }
}

// we have now to work on the comparison checker
function checkMatch() {
  // we select everything and look for all those 'img' tags
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];
  console.log("checking for match!");
  // let's go in the cardsChosen array
  if (optionOneId == optionTwoId) {
    alert("You have the same image!");
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    alert("You found a match!");
    // in all 'img' tags we want to reach the chosenCards Id as a first item in the cardsChosen array then we set a new image
    cards[optionOneId].setAttribute("src", "images/white.png");
    // to apply white.png to the second card in case of match
    cards[optionTwoId].setAttribute("src", "images/white.png");
    // remove EventListener on clicks when we found a match
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    // let's push the number of matches found in the new array cardsWon
    cardsWon.push(cardsChosen);
  } else {
    // if not the same we set default image and an alert
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    alert("Sorry try again!");
  }
  // as a "let" we can do whatever we want with those arrays
  // so if checkMath function si loaded it will clean those 2 arrays and//// giving us the ability to push only 2 ids, compare it and reset the array for a new try
  // for resultDisplay we just throw the size of cardsWon in the score span on HTML side
  resultDisplay.textContent = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  // we can have only 6 matches cuz 12 cards
  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations you found them all!";
  }
}
