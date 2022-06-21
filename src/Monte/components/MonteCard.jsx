import { createSignal } from "solid-js";
import queenPic from "../../assets/playing-cards-icon-8.jpg";

import Club from "../../Cards/Club";
import Diamond from "../../Cards/Diamond";
import Heart from "../../Cards/Heart";
import Spade from "../../Cards/Spade";

export default function MonteCard(props) {
  const {
    card,
    i,
    restart,
    monteWin,
    setMonteWin,
    setPoints,
    refresh,
    soundEffect2,
    soundEffect,
    winSfx
  } = props;

  const [flipMonte, setFlipMonte] = createSignal(false);

  const clickHandler = () => {
    setFlipMonte(true);
    soundEffect2().currentTime = 0;
    soundEffect2().play();
    // console.log(card);
    setTimeout(() => {
      if (card.value === "queen") {
        winSfx().currentTime = 0;
        winSfx().play();
        setMonteWin({
          over: true,
          founded: true
        });
      } else {
        setFlipMonte(false);
        soundEffect().currentTime = 0;
        soundEffect().play();
        setPoints(p => p - 1);
        if (!monteWin().over) {
          setTimeout(() => refresh(), 500);
        }
      }
    }, 1000);
  };

  //   console.log(monteWin());
  const returnSymbol = symbol => {
    switch (symbol) {
      case "club":
        return <Club />;
      case "spade":
        return <Spade />;
      case "heart":
        return <Heart />;
      case "diamond":
        return <Diamond />;
    }
  };

  return (
    <div
      class={`monte-flip ${flipMonte() && "flipped"} ${returnClass(i)} ${
        restart() && "anime"
      }`}
      onClick={clickHandler}
    >
      <div class={`monte ${card.color} front`}>
        <div class="monte-text top">
          <span>{card.text}</span>
          <span>{returnSymbol(card.symbol)}</span>
        </div>
        <div class="monte-text bottom">
          <span>{card.text}</span>
          <span>{returnSymbol(card.symbol)}</span>
        </div>
        {card.value === "queen" ? (
          <img src={queenPic} alt="" />
        ) : (
          <div class="value">
            {card.value === "A" ? "A" : <p>{returnSymbol(card.symbol)}</p>}
          </div>
        )}
      </div>
      <div class="monte back"></div>
    </div>
  );
}

const returnClass = id => {
  switch (id) {
    case 0:
      return "one";
    case 1:
      return "two";
    case 2:
      return "three";
  }
};
