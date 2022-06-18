import { createSignal } from "solid-js";
import "./cardBack.css";

export default function CardBack(props) {
  const { size, vol, drawCards, setDrawCards, setPlayers, setSkipable } = props;

  const [clicked, setClicked] = createSignal("");

  const draw = () => {
    setClicked("clicked");
    if (drawCards().length === 0) return;
    setPlayers(players => [
      players[0],
      { ...players[1], cards: [drawCards()[0], ...players[1].cards] }
    ]);

    setDrawCards(cards => cards.slice(1));
    setSkipable(true);

    setTimeout(() => {
      setClicked("");
    }, 250);
  };

  return (
    <div
      class={`card back ${vol ? vol : ""} ${clicked()}`}
      style={size || back}
      onClick={vol ? draw : null}
    >
      <div class="oval">
        <div class="back-text">UNO</div>
      </div>
    </div>
  );
}

const back = {
  width: "40px",
  height: "56px"
};
