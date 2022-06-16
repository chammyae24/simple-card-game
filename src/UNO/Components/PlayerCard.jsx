import UnoCard from "./UnoCard";
import { computerPlay, playerArrange } from "../utils/gameLogic";
import { createEffect, createSignal } from "solid-js";

export default function PlayerCard(props) {
  const {
    uno,
    desks,
    setDesks,
    setDeskCard,
    setPlayers,
    deskCard,
    players,
    setColorModal,
    setCompute,
    turns,
    setTurns,
    setColorChosenFromComputer
  } = props;

  const check = () => {
    if (!desks()[0].skipped) return;

    setDesks(cards => [uno, ...cards]);
    setDeskCard(uno);

    setPlayers(players => [
      players[0],
      {
        ...players[1],
        cards: players[1].cards.filter(player => player.id !== uno.id)
      }
    ]);

    if (uno.role === "change-color") {
      setColorModal(true);
      return;
    }

    setCompute(computerPlay(players(), deskCard()));

    setColorChosenFromComputer("");

    setTurns({
      player: false,
      computer: true
    });

    // if (
    //   uno.role === "draw-2" ||
    //   uno.role === "draw-4" ||
    //   uno.role === "skip" ||
    //   uno.role === "reverse"
    // ) {
    //   setDeskCard(card => ({ ...card, skip: true }));
    //   setTurns({
    //     player: true,
    //     computer: false
    //   });
    // }
  };

  return (
    <div onClick={check} style={{ opacity: !turns().player ? 0.5 : 1 }}>
      <UnoCard
        uno={uno}
        deskCard={null}
        size={{
          width: "65px",
          height: "90px"
        }}
      />
    </div>
  );
}
