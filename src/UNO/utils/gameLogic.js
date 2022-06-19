// How computer play
export const computerPlay = (players, deskCard, color = "red") => {
  // const playCards = players[0].cards.sort(() => Math.random() - 0.5);
  const playCards = players[0].cards;

  // choose a card to play
  const cardObj = chooseCard(playCards, deskCard, color);

  if (cardObj === undefined) {
    return { canPlay: false, card: null, draw: 1 };
  }

  // console.log("Logic: ", cardObj);
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

  return undefined;
};

export const placeRandomCard = (players, card) => {
  if (players.cards.length === 0) return null;
  for (let i = 0; i < players.cards.length; i++) {
    if (card.color === players.cards[i].color) {
      return { card: players.cards[i] };
    } else if (players.cards[i].role === "change-color") {
      return { card: players.cards[i], color: randomColor() };
    } else if (players.cards[i].role === "draw-4") {
      return { card: players.cards[i] };
    } else if (card.color === "black") {
      return { card: players.cards[0] };
    }
  }
  return null;
};

export const playerCardValidate = (pCard, dCard, color = null) => {
  if (
    pCard.color === dCard.color ||
    (pCard.role === "numbers" && pCard.value === dCard.value)
  ) {
    return true;
  }

  if (pCard.role !== "numbers" && pCard.role === dCard.role) {
    return true;
  }

  if (pCard.color === "black") {
    return true;
  }

  if (dCard.role === "change-color" && pCard.color === color) {
    return true;
  }

  if (dCard.color === "black" && dCard.role === "draw-4") {
    return true;
  }

  return false;
};
