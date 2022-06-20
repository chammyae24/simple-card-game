import { createSignal } from "solid-js";
import queenPic from "../../assets/playing-cards-icon-8.jpg";

export default function MonteCard(props) {
  const { card, i, restart, monteWin, setMonteWin, setPoints, refresh } = props;

  const [flipMonte, setFlipMonte] = createSignal(false);

  const clickHandler = () => {
    setFlipMonte(true);
    // console.log(card);
    setTimeout(() => {
      if (card.value === "queen") {
        setMonteWin({
          over: true,
          founded: true
        });
      } else {
        setFlipMonte(false);
        setPoints(p => p - 1);
        if (!monteWin().over) {
          setTimeout(() => refresh(), 500);
        }
      }
    }, 1000);
  };

  //   console.log(monteWin());

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
          <span>{card.symbol}</span>
        </div>
        <div class="monte-text bottom">
          <span>{card.text}</span>
          <span>{card.symbol}</span>
        </div>
        {card.value === "queen" ? (
          <img src={queenPic} alt="" />
        ) : (
          <div class="value">
            {card.value === "A" ? "A" : <p>{card.symbol}</p>}
          </div>
        )}
      </div>
      <div class="monte back"></div>
    </div>
  );
}

function returnClass(id) {
  switch (id) {
    case 0:
      return "one";
      break;
    case 1:
      return "two";
      break;
    case 2:
      return "three";
      break;
  }
}
