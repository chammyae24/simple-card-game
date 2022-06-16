import { UNO } from "./data";

// The Fisher-Yates algorith
const shuffleCards = cards => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  return cards;
};

export const getCards = num => {
  const player = [];
  const player2 = [];

  const desk = [];
  const draw = [];

  const cards = shuffleCards(UNO);

  for (let i = 0; i < num; i++) {
    player.push(cards[i]);
    player2.push(cards[i + num]);
  }

  for (let j = num * 2; j < cards.length; j++) {
    draw.push(cards[j]);
  }

  for (let k = 0; k < draw.length; k++) {
    if (draw[k].role === "numbers") {
      desk.push(draw[k]);
      draw.splice(k, 1);
      break;
    }
  }

  return [
    [player, player2],
    [desk, draw]
  ];
};

export const createPlayer = players => {
  players.sort(() => Math.random() - 0.5);
  return [
    {
      id: 1,
      name: "Computer",
      cards: players[0]
    },
    {
      id: 2,
      name: "player",
      cards: players[1]
    }
  ];
};

export const addToArray = (arr, element) => {
  let array = arr;
  if (element !== undefined) array.push(element);
  return array;
};

export const removeArrayFromStart = arr => {
  let array = arr;
  if (array.length > 0) array.shift();
  return array;
};
