import { createEffect } from "solid-js";
import { createSignal } from "solid-js";
import BJNav from "./components/BJNav";
import BlackJackInfo from "./components/BlackJackInfo";
import BlackJackModal from "./components/BlackJackModal";
import Card from "./components/Card";
import FaceDownCard from "./components/FaceDownCard";

import { shufflePlayCards, getSum, getAceCount } from "./utils/utils";

export default function BlackJack(props) {
  const { setHome, soundEffect2, winSfx, loseSfx } = props;

  const [blackJack, setBlackJack] = createSignal(shufflePlayCards());
  const [totalSum, setTotalSum] = createSignal({
    dealer: getSum(blackJack()[0].cards),
    player: getSum(blackJack()[1].cards)
  });
  const [aceCount, setAceCount] = createSignal({
    dealer: getAceCount(blackJack()[0].cards),
    player: getAceCount(blackJack()[1].cards)
  });
  const [canDraw, setCanDraw] = createSignal(true);
  const [turned, setTurned] = createSignal(false);

  const [wining, setWining] = createSignal({
    over: false,
    win: false,
    draw: false,
    sums: {
      dealer: 0,
      player: 0
    }
  });

  const [blackJackInfo, setBlackJackInfo] = createSignal(true);

  setTimeout(() => setBlackJackInfo(false), 3000);

  createEffect(() => {
    // console.log(blackJack());
    // console.log("Sum: ", totalSum());
    // console.log("Ace: ", aceCount());
  });

  const refresh = () => {
    setBlackJack(shufflePlayCards());
    setTotalSum({
      dealer: getSum(blackJack()[0].cards),
      player: getSum(blackJack()[1].cards)
    });
    setAceCount({
      dealer: getAceCount(blackJack()[0].cards),
      player: getAceCount(blackJack()[1].cards)
    });
    setCanDraw(true);
    setTurned(false);
    setWining({
      over: false,
      win: false,
      sums: {
        dealer: 0,
        player: 0
      }
    });
  };

  const checkDraw = () => {
    let sum = totalSum().player;
    let aces = aceCount().player;

    if (sum <= 21) {
      setCanDraw(true);
    } else if (sum > 21 && aces > 0) {
      while (sum > 21 && aces > 0) {
        sum = sum - 10;
        aces--;
      }
      if (sum <= 21) {
        setCanDraw(true);
      } else {
        setCanDraw(false);
      }
    } else {
      setCanDraw(false);
    }

    // console.log("Sum: ", sum);
    // console.log("Aces: ", aces);
  };

  createEffect(() => {
    checkDraw();
  });

  const drawCard = () => {
    setBlackJack(players => [
      players[0],
      {
        ...players[1],
        cards: [...players[1].cards, ...players[2].cards.slice(0, 1)]
      },
      {
        ...players[2],
        cards: players[2].cards.slice(1)
      }
    ]);

    setTotalSum(sums => ({
      ...sums,
      player: getSum(blackJack()[1].cards)
    }));
    setAceCount(aces => ({
      ...aces,
      player: getAceCount(blackJack()[1].cards)
    }));
  };

  const decideWinner = () => {
    setTurned(true);
    soundEffect2().currentTime = 0;
    soundEffect2().play();

    setTimeout(() => {
      // Check player sum
      while (totalSum().player > 21 && aceCount().player > 0) {
        setTotalSum(sums => ({
          ...sums,
          player: sums.player - 10
        }));
        setAceCount(aces => ({
          ...aces,
          player: aces.player - 1
        }));
      }

      // Check Dealer Sum
      while (totalSum().dealer > 21 && aceCount().dealer > 0) {
        setTotalSum(sums => ({
          ...sums,
          dealer: sums.dealer - 10
        }));
        setAceCount(aces => ({
          ...aces,
          dealer: aces.dealer - 1
        }));
      }

      // Set who wins
      if (totalSum().player > 21) {
        setWining({
          over: true,
          win: false,
          draw: false,
          sums: totalSum()
        });
        loseSfx().currentTime = 0;
        loseSfx().play();
      } else {
        if (totalSum().dealer > 21) {
          setWining({
            over: true,
            win: true,
            draw: false,
            sums: totalSum()
          });
          winSfx().currentTime = 0;
          winSfx().play();
        } else if (totalSum().dealer > totalSum().player) {
          setWining({
            over: true,
            win: false,
            draw: false,
            sums: totalSum()
          });
          loseSfx().currentTime = 0;
          loseSfx().play();
        } else if (totalSum().dealer < totalSum().player) {
          setWining({
            over: true,
            win: true,
            draw: false,
            sums: totalSum()
          });
          winSfx().currentTime = 0;
          winSfx().play();
        } else {
          setWining({
            over: true,
            win: false,
            draw: true,
            sums: totalSum()
          });
          loseSfx().currentTime = 0;
          loseSfx().play();
        }
      }
    }, 1000);
  };

  return (
    <>
      {blackJackInfo() && <BlackJackInfo setBlackJackInfo={setBlackJackInfo} />}
      <BJNav setHome={setHome} setBlackJackInfo={setBlackJackInfo} />
      <div style={gameContainer} class="mb-3">
        <div style={dealerSection}>
          <h3 class="text-center mb-3">Dealer</h3>
          <div style={cardsContainer}>
            {blackJack()[0]
              .cards.slice(0, 1)
              .map(card => (
                <FaceDownCard card={card} turned={turned} />
              ))}
            {blackJack()[0]
              .cards.slice(1)
              .map(card => (
                <Card card={card} />
              ))}
          </div>
        </div>
        <div class="d-flex justify-content-center my-3">
          <button class="btn btn-warning" onClick={refresh}>
            refresh
          </button>
        </div>
        <div style={playerSection}>
          <h3 class="text-center mb-3">Player</h3>
          <div style={cardsContainer}>
            {blackJack()[1].cards.map(card => (
              <Card card={card} />
            ))}
          </div>
          <div class="d-flex justify-content-center my-3">
            <button
              onClick={drawCard}
              class={`btn btn-${!canDraw() ? "danger" : "warning"} mx-1 ${
                !canDraw() ? "disabled" : ""
              }`}
              style={{ width: "100px" }}
            >
              Draw
            </button>
            <button
              onClick={decideWinner}
              class="btn btn-warning mx-1"
              style={{ width: "100px" }}
            >
              OK
            </button>
          </div>
        </div>
      </div>

      {wining().over && (
        <BlackJackModal setHome={setHome} wining={wining} refresh={refresh} />
      )}
    </>
  );
}

const gameContainer = {
  "font-family": "Fredoka One, cursive",
  display: "flex",
  "flex-direction": "column",
  "justify-content": "center",
  "align-items": "center"
};

const dealerSection = {
  "background-color": "#8686867e",
  "border-radius": "5px",
  padding: "10px 20px",
  margin: "0 10px",
  perspective: "800px"
};

const playerSection = {
  "background-color": "#8686867e",
  "border-radius": "5px",
  margin: "0 10px",
  padding: "10px 20px"
};

const cardsContainer = {
  display: "flex",
  "flex-wrap": "wrap",
  "justify-content": "center",
  gap: "10px"
};
