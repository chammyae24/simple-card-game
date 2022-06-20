import { createSignal } from "solid-js";

import MonteNav from "./components/MonteNav";
import MonteCard from "./components/MonteCard";

// CSS
import "./Monte.scss";
import { shuffle } from "./utils";
import { createEffect } from "solid-js";

const cardArray = [
  { id: 1, value: "queen", text: "Q", color: "red", symbol: "♥" },
  { id: 2, value: "A", text: "A", color: "black", symbol: "♣" },
  { id: 3, value: "9", text: "9", color: "black", symbol: "♠" }
];

export default function MonteGame({ setHome, soundEffect, soundEffect2 }) {
  const [monteCards, setMonteCards] = createSignal(shuffle(cardArray));
  const [restart, setRestart] = createSignal(false);

  const [points, setPoints] = createSignal(5);

  const [monteWin, setMonteWin] = createSignal({
    over: false,
    founded: false
  });

  const refresh = () => {
    setRestart(true);
    setMonteWin({
      over: false,
      founded: false
    });
    setMonteCards(shuffle(cardArray));
  };

  createEffect(() => {
    if (restart()) {
      setTimeout(() => {
        setRestart(false);
      }, 3000);
    }
  });

  createEffect(() => {
    if (points() === 0 && !monteWin().founded) {
      setMonteWin({
        over: true,
        founded: false
      });
    }

    if (monteWin().over) {
      setPoints(5);
    }
  });

  return (
    <div>
      <MonteNav setHome={setHome} />
      <h2 style={title} class="text-center mt-4">
        Find the Queen
      </h2>
      <div
        style={{
          ...cardContainer,
          "pointer-events": restart() ? "none" : "auto"
        }}
      >
        {monteCards().cards.map((card, i) => (
          <MonteCard
            card={card}
            i={i}
            restart={restart}
            monteWin={monteWin}
            setMonteWin={setMonteWin}
            refresh={refresh}
            setPoints={setPoints}
          />
        ))}
      </div>
      <div style={btnContainer}>
        <button style={btn} class="btn" onClick={refresh}>
          {monteWin().founded ? "Play Again" : "Shuffle"}
        </button>
      </div>
      <h2 style={point} class="text-center my-3">
        {points()} points
      </h2>
      {monteWin().over && (
        <div style={winBackground}>
          <div style={winCard}>
            <h1 style={winTitle}>
              {monteWin().founded ? "You found it" : "Sorry, you cannot find"}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

const title = {
  "font-family": "Fredoka One, cursive",
  color: "#ffc400",
  "font-size": "2rem"
};

const cardContainer = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  margin: "1.5rem 0",
  perspective: "800px"
};

const btnContainer = {
  display: "flex",
  "justify-content": "center"
};

const btn = {
  background: "#ffc400",
  color: "#500808"
};

const winBackground = {
  width: "100%",
  height: "30vh",
  display: "flex",
  "justify-content": "center",
  "align-items": "center"
};
const winCard = {
  width: "50%",
  "background-color": "#fff",
  color: "#5e00da",
  "font-family": "Fredoka One, cursive",
  border: "1px solid #5e00da",
  "border-radius": "10px",
  padding: "1rem"
};
const winTitle = {
  "text-align": "center"
};

const point = {
  "font-family": "Fredoka One, cursive"
};
