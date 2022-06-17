// How computer play
export const computerPlay = (players, deskCard, color = "red") => {
  // const playCards = players[0].cards.sort(() => Math.random() - 0.5);
  const playCards = players[0].cards;

  // choose a card to play
  const cardObj = chooseCard(playCards, deskCard, color);

  if (cardObj === undefined) {
    return { canPlay: false, card: null, draw: 1 };
  }

  // console.log(cardObj);
  return cardObj;
};

export const randomColor = () => {
  const colors = ["red", "blue", "green", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const chooseCard = (cards, desk, color) => {
  let content;

  if (desk.role !== "numbers" && !desk.skipped) {
    switch (desk.role) {
      case "skip":
        content = { canPlay: false, card: null };
        break;
      case "reverse":
        content = { canPlay: false, card: null };
        break;
      case "draw-2":
        content = { canPlay: false, card: null, draw: 2 };
        break;
      case "draw-4":
        content = { canPlay: false, card: null, draw: 4 };
        break;
      default:
        content = "";
        break;
    }
    return content;
  }

  for (let i = 0; i < cards.length; i++) {
    if (
      desk.role === "numbers" &&
      (cards[i].color === desk.color || cards[i].value === desk.value)
    ) {
      return { canPlay: true, card: cards[i] };
    }

    if (desk.role !== "numbers" && desk.skipped) {
      if (cards[i].color === color && desk.role === "change-color") {
        return { canPlay: true, card: cards[i] };
      }

      if (cards[i].color === desk.color && cards[i].color !== "black") {
        return { canPlay: true, card: cards[i] };
      }
    }

    if (cards[i].color === "black") {
      if (cards[i].role === "change-color") {
        return { canPlay: true, card: cards[i], color: randomColor() };
      } else {
        return { canPlay: true, card: cards[i], draw: 4 };
      }
    }
  }
};

export const playerArrange = (id, direction) => {
  let newId;
  if (direction === "right") {
    switch (id) {
      case 1:
        newId = 3;
        break;
      case 2:
        newId = 1;
        break;
      case 3:
        newId = 2;
        break;
    }
    return newId;
  } else {
    switch (id) {
      case 1:
        newId = 2;
        break;
      case 2:
        newId = 3;
        break;
      case 3:
        newId = 1;
        break;
    }
    return newId;
  }
};

export const placeRandomCard = (players, card) => {
  let newCard;
  let index = Math.floor(Math.random() * players.cards.length);
  if (card.role !== "numbers" && card.role !== "change-color") {
    newCard = players.cards[index];
    return newCard;
  }
  return null;
};
