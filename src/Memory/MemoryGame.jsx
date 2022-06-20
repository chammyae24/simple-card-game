import { createSignal, createEffect } from "solid-js";
import MemoNav from "./components/MemoNav";
import MemoryCard from "./components/MemoryCard";

import { getMemoCards } from "./utils/utils";
import { memoCards } from "./utils/data";
import WinMemo from "./components/WinMemo";

export default function MemoryGame({ setHome, soundEffect, soundEffect2 }) {
  const [memo, setMemo] = createSignal(getMemoCards(memoCards));
  const [checkMemo, setCheckMemo] = createSignal([]);

  const [arrayMatch, setArrayMatch] = createSignal([]);

  const [sec, setSec] = createSignal(60);

  const [winMemo, setWinMemo] = createSignal({
    over: false,
    win: false,
    left: null
  });

  const shuffle = () => {
    setMemo(getMemoCards(memoCards));
    setArrayMatch([]);
    setWinMemo({
      over: false,
      win: false,
      left: null
    });
    setSec(60);
  };

  createEffect(() => {
    // console.log(checkMemo());
    if (checkMemo().length > 2) {
      setCheckMemo(cards => cards.slice(2));
    }

    if (checkMemo().length === 2) {
      if (checkMemo()[0].value === checkMemo()[1].value) {
        setArrayMatch(arr => [...arr, ...checkMemo()]);
      }
    }
  });

  let times;

  createEffect(() => {
    if (sec() === 60) {
      times = setInterval(() => setSec(sec => sec - 1), 1000);
    }

    if (sec() === 0) {
      clearInterval(times);
      if (arrayMatch().length < 16) {
        setWinMemo({
          over: true,
          win: false,
          left: (memo().cards.length - arrayMatch().length) / 2
        });
      }
    }

    if (arrayMatch().length === 16) {
      clearInterval(times);
      setWinMemo({ over: true, win: true, left: null });
    }
  });

  return (
    <div style={memoGameContainer}>
      <MemoNav setHome={setHome} shuffle={shuffle} />

      <div style={game}>
        <div style={score}>
          <h4>Score: {arrayMatch().length / 2}</h4>
          <h4>Time: {sec()}</h4>
        </div>
        <div style={cardContainer}>
          {memo().cards.map(card => (
            <MemoryCard
              logo={card.class}
              card={card}
              checkMemo={checkMemo}
              setCheckMemo={setCheckMemo}
              arrayMatch={arrayMatch}
              soundEffect={soundEffect}
              soundEffect2={soundEffect2}
            />
          ))}
        </div>
      </div>
      {winMemo().over && (
        <WinMemo setHome={setHome} shuffle={shuffle} winMemo={winMemo} />
      )}
    </div>
  );
}

const memoGameContainer = {
  display: "flex",
  "flex-direction": "column",
  "justify-content": "center",
  "align-items": "center",
  position: "relative"
};

const game = {
  display: "flex",
  "flex-direction": "column",
  "justify-content": "center",
  "align-items": "center",
  "max-width": "400px",
  perspective: "500px"
};

const cardContainer = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  "flex-wrap": "wrap",
  gap: "10px"
};

const score = {
  display: "flex",
  "justify-content": "space-between",
  "align-items": "center",
  width: "100%",
  padding: "15px 10px",
  "font-family": "Fredoka One, cursive"
};
