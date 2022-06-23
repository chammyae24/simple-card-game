import { createSignal } from "solid-js";
import BJNav from "./components/BJNav";

import { shufflePlayCards } from "./utils/utils";

export default function BlackJack(props) {
  const { setHome, soundEffect, soundEffect2, winSfx, loseSfx } = props;

  const [blackJack, setBlackJack] = createSignal(shufflePlayCards());

  return (
    <>
      <BJNav setHome={setHome} />
      <div style={gameContainer}>
        <div style={dealerSection}>
          <h3>Dealer</h3>
          <ul>
            {blackJack()[0].cards.map(card => (
              <li>
                {card.value} - {card.type}
              </li>
            ))}
          </ul>
        </div>
        <div style={playerSection}>
          <h3>Player</h3>
          <ul>
            {blackJack()[1].cards.map(card => (
              <li>
                {card.value} - {card.type}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button onClick={() => setBlackJack(shufflePlayCards())}>
            refresh
          </button>
        </div>
      </div>
    </>
  );
}

const gameContainer = {};

const dealerSection = {};

const playerSection = {};
