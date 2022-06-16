import { createSignal } from "solid-js";
import { addToArray, removeArrayFromStart } from "../utils/utils";
import "./cardBack.css";

export default function CardBack(props) {
  const { size, vol, drawCards, setDrawCards, setPlayers } = props;

  const [clicked, setClicked] = createSignal("");

  const draw = () => {
    setClicked("clicked");
    setPlayers(players => [
      players[0],
      { ...players[1], cards: addToArray(players[1].cards, drawCards()[0]) }
    ]);

    setDrawCards(cards => removeArrayFromStart(cards));

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
