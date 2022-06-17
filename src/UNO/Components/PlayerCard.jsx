import UnoCard from "./UnoCard";
import { computerPlay, playerCardValidate } from "../utils/gameLogic";
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
    setColorChosenFromComputer,
    colorChosenFromComputer
  } = props;

  const check = () => {
    if (!playerCardValidate(uno, deskCard(), colorChosenFromComputer())) return;
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
