// How computer play
export const computerPlay = (players, deskCard, color = "red") => {
  // const playCards = players[0].cards.sort(() => Math.random() - 0.5);
  const playCards = players[0].cards;

  // choose a card to play
  const cardObj = chooseCard(playCards, deskCard, color);

  if (cardObj === null) {
    return { canPlay: false, card: null, draw: 1 };
  }

  console.log(cardObj);
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
        content = null;
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

  return null;
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

export const playerCardValidate = (pCard, dCard, color = null) => {
  if (pCard.color === dCard.color || pCard.value === dCard.value) {
    return true;
  }

  if (pCard.color === "black") {
    return true;
  }

  // console.log(pCard.color);
  // console.log(color);

  if (dCard.role === "change-color" && pCard.color === color) {
    return true;
  }

  if (dCard.color === "black" && dCard.role !== "change-color") {
    return true;
  }

  return false;
};
