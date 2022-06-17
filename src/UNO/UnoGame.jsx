import { createEffect, createSignal } from "solid-js";
import { Link } from "solid-app-router";
import CardBack from "./Components/CardBack";

import sfx1 from "../audio/card-sfx-02.wav";

import { getCards, createPlayer, removeArrayFromStart } from "./utils/utils";
import { placeRandomCard, randomColor, computerPlay } from "./utils/gameLogic";

import "./unoGame.css";
import DeskCard from "./Components/DeskCard";
import PlayerCard from "./Components/PlayerCard";
import ColorModal from "./Components/ColorModal";

import Loadings from "./Components/Loadings";
import WinnerModal from "./Components/WinnerModal";
import Rules from "./Components/Rules";

export default function UnoGame({ setHome, setSound, play }) {
  // Get cards for each player by number (15)
  const [cards, setCards] = createSignal(getCards(15));
  // Get random arrange for player to get cards
  const [players, setPlayers] = createSignal(createPlayer(cards()[0]));

  // create array for draw cards
  const [drawCards, setDrawCards] = createSignal(cards()[1][1]);
  // create desk cards array
  const [desks, setDesks] = createSignal(cards()[1][0]);
  // get desk card for display on middle desk
  const [deskCard, setDeskCard] = createSignal(desks()[0]);

  // choose color
  const [colorModal, setColorModal] = createSignal(false);
  const [chosenColor, setChosenColor] = createSignal(null);

  // to play from Computer...
  const [compute, setCompute] = createSignal(null);
  const [computerThinking, setComputerThinking] = createSignal(false);
  const [colorChosenFromComputer, setColorChosenFromComputer] =
    createSignal("");

  // creat something to decide whose turns
  const [turns, setTurns] = createSignal({
    player: true,
    computer: false
  });

  // determine who wins
  const [winner, setWinner] = createSignal({
    over: false,
    winner: "",
    loser: ""
  });

  const [click, setClick] = createSignal(false);

  // Info
  const [info, setInfo] = createSignal(true);

  setTimeout(() => setInfo(false), 3000);

  const refresh = () => {
    setCards(getCards(15));
    setPlayers(createPlayer(cards()[0]));
    setDrawCards(cards()[1][1]);
    setDesks(cards()[1][0]);
    setDeskCard(desks()[0]);
    setColorModal(false);
    setChosenColor(null);
    setCompute(null);
    setComputerThinking(false);
    setColorChosenFromComputer("");
    setTurns({
      player: true,
      computer: false
    });
    setWinner({
      over: false,
      winner: "",
      loser: ""
    });
  };

  function randomCard(card) {
    setSound(sfx1);
    if (play() !== null) play().play();
    switch (card.role) {
      case "skip":
      case "reverse":
        break;
      case "draw-2":
        setPlayers(players => [
          players[0],
          {
            ...players[1],
            cards: [drawCards()[0], drawCards()[1], ...players[1].cards]
          }
        ]);
        setDrawCards(cards => cards.slice(2));
        break;
      case "draw-4":
        setPlayers(players => [
          players[0],
          {
            ...players[1],
            cards: [
              drawCards()[0],
              drawCards()[1],
              drawCards()[2],
              drawCards()[3],
              ...players[1].cards
            ]
          }
        ]);
        setDrawCards(cards => cards.slice(4));
        break;
    }

    let rand = placeRandomCard(players()[0], card);

    setPlayers(players => [
      {
        ...players[0],
        cards: players[0].cards.filter(card => card.id !== rand.id)
      },
      players[1]
    ]);

    if (rand.role === "change-color") setColorChosenFromComputer(randomColor());

    setDesks(cards => {
      if (rand.id === cards[0].id) {
        return cards;
      } else {
        return [rand, ...cards];
      }
    });
    setDeskCard(desks()[0]);
    // console.log(desks());
    if (rand.role !== "numbers" && rand.role !== "change-color") {
      randomCard(rand);
    }
  }

  function computerPlaying() {
    if (!turns().computer) return;

    if (compute() === null) return;

    if (compute().canPlay) {
      setComputerThinking(true);
      setSound(sfx1);

      setTimeout(() => {
        if (play() !== null) {
          play().play();
        }
        setPlayers(players => [
          {
            ...players[0],
            cards: players[0].cards.filter(
              card => card.id !== compute().card.id
            )
          },
          players[1]
        ]);
        setDesks(cards => [compute().card, ...cards]);
        setDeskCard(compute().card);
        if (compute().color) {
          setColorChosenFromComputer(compute().color);
        }

        if (
          compute().card.role !== "numbers" &&
          compute().card.role !== "change-color"
        ) {
          setTimeout(() => {
            setComputerThinking(true);
            randomCard(compute().card);
            setComputerThinking(false);
            setTurns({
              player: true,
              computer: false
            });
          }, 1000);
          return;
        }

        setComputerThinking(false);
        setTurns({
          player: true,
          computer: false
        });
        return;
      }, 1500);
    } else if (!compute().canPlay && compute().draw === 1) {
      setComputerThinking(true);
      setTimeout(() => {
        if (drawCards().length > 0) {
          if (
            drawCards()[0].color === deskCard().color ||
            drawCards()[0].value === deskCard().value ||
            drawCards()[0].color === "black"
          ) {
            setDesks(cards => [drawCards()[0], ...cards]);
            setDeskCard(desks()[0]);
            if (
              drawCards()[0].role !== "numbers" &&
              drawCards()[0].role !== "change-color"
            ) {
              setTimeout(() => {
                setComputerThinking(true);
                randomCard(drawCards()[0]);
                setDrawCards(cards => cards.slice(1));
                setComputerThinking(false);
                setTurns({
                  player: true,
                  computer: false
                });
              }, 1000);
              return;
            }
          } else {
            setPlayers(players => [
              {
                ...players[0],
                cards: [drawCards()[0], ...players[0].cards]
              },
              players[1]
            ]);
          }
          setDrawCards(cards => cards.slice(1));
        }
        setComputerThinking(false);
        setTurns({
          player: true,
          computer: false
        });
        return;
      }, 1500);
    } else if (!compute().canPlay) {
      // Do somethings
      setComputerThinking(true);
      setTimeout(() => {
        if (compute().draw !== undefined && drawCards().length > 0) {
          switch (compute().draw) {
            case 2:
              setPlayers(players => [
                {
                  ...players[0],
                  cards: [drawCards()[0], drawCards()[1], ...players[0].cards]
                },
                players[1]
              ]);
              setDrawCards(cards => cards.slice(2));
              break;
            case 4:
              setPlayers(players => [
                {
                  ...players[0],
                  cards: [
                    drawCards()[0],
                    drawCards()[1],
                    drawCards()[2],
                    drawCards()[3],
                    ...players[0].cards
                  ]
                },
                players[1]
              ]);
              setDrawCards(cards => cards.slice(4));
              break;
          }
        }
        setDeskCard(card => ({ ...card, skipped: true }));
        setDesks(cards =>
          cards.map(card => {
            if (card.id === deskCard().id) {
              return deskCard();
            } else {
              return card;
            }
          })
        );
        console.log(deskCard());
        setComputerThinking(false);
        setTurns({
          player: true,
          computer: false
        });
        return;
      }, 1500);
    }
  }

  createEffect(() => {
    computerPlaying();
  });

  createEffect(() => {
    setComputerThinking(false);
    if (players()[0].cards.length === 0) {
      setWinner({
        over: true,
        winner: "Computer",
        loser: "You"
      });
    }
    if (players()[1].cards.length === 0) {
      setWinner({
        over: true,
        winner: "You",
        loser: "Computer"
      });
    }
  });

  createEffect(() => {
    console.log(
      players()[0].cards.length +
        players()[1].cards.length +
        drawCards().length +
        desks().length
    );
    console.log("Computer: ", players()[0].cards);
    console.log("Desks: ", desks());
  });

  const skipHandle = () => {
    setTurns({
      player: false,
      computer: true
    });
    setCompute(computerPlay(players(), deskCard()));
  };

  return (
    <>
      {info() && <Rules setInfo={setInfo} />}
      {winner().over && (
        <WinnerModal
          players={players}
          winner={winner}
          setHome={setHome}
          refresh={refresh}
        />
      )}
      {colorModal() && (
        <ColorModal
          setChosenColor={setChosenColor}
          setColorModal={setColorModal}
          players={players}
          chosenColor={chosenColor}
          deskCard={deskCard}
          setCompute={setCompute}
          setTurns={setTurns}
        />
      )}
      {computerThinking() && <Loadings />}
      <div id="back">
        <p>UNO</p>
        <div class="link-container">
          <button
            class="btn d-flex justify-content-center align-items-center text-warning"
            onClick={() => setInfo(i => !i)}
          >
            <i class="fa-solid fa-lightbulb"></i>
          </button>
          <Link href="/" onClick={() => setHome(true)}>
            Home
          </Link>
          <a onClick={refresh}>Refresh</a>
        </div>
      </div>
      <div id="game">
        <div id="computer">
          <div id="computer-1">
            <h5>Computer || cards: {players()[0].cards.length}</h5>
            <div className="card-container" style={cardContainer}>
              {players()[0].cards.map(u => (
                // <UnoCard uno={u} />
                <CardBack />
              ))}
            </div>
          </div>
        </div>
        <div id="table">
          <div
            id="draw-card"
            class={`${click() && "click"}`}
            onClick={() => setClick(c => !c)}
          >
            <CardBack
              size={{ width: "60px", height: "85px" }}
              vol="volume"
              drawCards={drawCards}
              setDrawCards={setDrawCards}
              setPlayers={setPlayers}
            />
            <h5 class="mt-2">Draw</h5>
            <p class="cards-count">{drawCards().length} cards left.</p>
            <div id="skip-button">
              <button class="btn btn-warning" onClick={skipHandle}>
                SKIP
              </button>
            </div>
          </div>
          <div id="desk">
            <DeskCard deskCard={deskCard} animate={false} />
            <p>{colorChosenFromComputer()} </p>
          </div>
        </div>
        <div id="player">
          <h3>Player || cards: {players()[1].cards.length}</h3>
          <div class="card-container" style={!turns().player && cardContainer}>
            {players()[1].cards.map(u => (
              <PlayerCard
                uno={u}
                desks={desks}
                setDesks={setDesks}
                setDeskCard={setDeskCard}
                setPlayers={setPlayers}
                deskCard={deskCard}
                players={players}
                setColorModal={setColorModal}
                setCompute={setCompute}
                turns={turns}
                setTurns={setTurns}
                setColorChosenFromComputer={setColorChosenFromComputer}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const cardContainer = {
  "pointer-events": "none"
};
