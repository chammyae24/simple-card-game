import { createEffect, createSignal } from "solid-js";
import "./memoryCard.scss";

export default function MemoryCard(props) {
  const {
    logo,
    card,
    checkMemo,
    setCheckMemo,
    arrayMatch,
    soundEffect,
    soundEffect2
  } = props;

  const [flip, setFlip] = createSignal(false);
  const [memoCard, setMemoCard] = createSignal(card);

  const startMemo = () => {
    // setFlip(true);
    soundEffect2().currentTime = 0;
    soundEffect2().play();
    setMemoCard(memo => ({ ...memo, flip: true }));
    setCheckMemo(cards => [...cards, memoCard()]);
    // console.log(memoCard());
  };

  createEffect(() => {
    if (checkMemo().length === 2) {
      setTimeout(() => {
        if (checkMemo()[0].value !== checkMemo()[1].value) {
          soundEffect().play();
          setMemoCard(memo => ({ ...memo, flip: false }));
        }
      }, 1000);
    }
  });

  createEffect(() => {
    for (let i = 0; i < arrayMatch().length; i++) {
      if (arrayMatch()[i].id === card.id) {
        setFlip(true);
      }
    }
    if (arrayMatch().length === 0) {
      setFlip(false);
    }
  });

  return (
    <div
      class={`flip ${(memoCard().flip || flip()) && "flipped"}`}
      onClick={startMemo}
      style={{ "pointer-events": memoCard().flip || flip() ? "none" : "auto" }}
    >
      <div class="memo-card front">
        <div
          class="logo"
          style={{
            color: color(card.class).color,
            "background-color": color(card.class).bg
          }}
        >
          <i class={`fa-brands ${logo}`}></i>
        </div>
      </div>

      <div class="memo-card back">
        <div class="inner">memo</div>
      </div>
    </div>
  );
}

const color = c => {
  switch (c) {
    case "fa-js-square":
      return { color: "#f7df1e", bg: "#824ebd" };
    case "fa-java":
      return { color: "#ffddb4", bg: "#885917" };
    case "fa-react":
      return { color: "#61dafb", bg: "#5e2959" };
    case "fa-vuejs":
      return { color: "#41b883", bg: "#2d4092" };
    case "fa-bootstrap":
      return { color: "#563d7c", bg: "#ffee07" };
    case "fa-python":
      return { color: "#f9a825", bg: "#1c3b7e" };
    case "fa-angular":
      return { color: "#ff3149", bg: "#fffc48" };
    case "fa-laravel":
      return { color: "#ac0014", bg: "#a1ffef" };
  }
};
