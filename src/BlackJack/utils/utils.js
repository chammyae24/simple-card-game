const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const types = ["diam", "club", "heart", "spade"];

const getPlayCards = () => {
  let cardArray = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < types.length; j++) {
      cardArray.push({
        value: values[i],
        type: types[j],
        color: getColor(types[j])
      });
    }
  }

  return cardArray;
};

const getColor = type => {
  if (type === "diam" || type === "heart") {
    return "#cc1212";
  } else {
    return "black";
  }
};

export const shufflePlayCards = (dealerSum = 0) => {
  const cards = getPlayCards();

  for (let i = 0; i < cards.length; i++) {
    let j = Math.floor(Math.random() * cards.length);
    let temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  //   console.log(getValue(cards[0]));
  let dealer = [];

  while (dealerSum < 17) {
    let card = cards.pop();
    dealer.push(card);
    dealerSum += getValue(card);
  }

  //   console.log("dealer: ", dealer);

  return [
    {
      role: "dealer",
      cards: dealer
    },
    {
      role: "player",
      cards: [cards[0], cards[1]]
    },
    {
      role: "desk",
      cards: cards.slice(2)
    }
  ];
};

const getValue = card => {
  if (isNaN(card.value) && card.value === "A") {
    return 11;
  } else if (isNaN(card.value) && (card === "J" || "Q" || "K")) {
    return 10;
  } else {
    return card.value;
  }
};

export const getAceCount = cards => {
  let aceCount = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value === "A") {
      aceCount++;
    }
  }
  return aceCount;
};

export const getSum = cards => {
  let sum = 0;
  for (let i = 0; i < cards.length; i++) {
    sum += getValue(cards[i]);
  }
  return sum;
};
