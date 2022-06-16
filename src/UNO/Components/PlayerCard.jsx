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
    if (!desks()[0].skipped) {
      setDesks(cards =>
        cards.map(card => {
          if (card.id === deskCard().id) {
            return { ...card, skipped: true };
          } else {
            return card;
          }
        })
      );

      setCompute(computerPlay(players(), deskCard()));
      setTurns({
        player: false,
        computer: true
      });
      return;
    }

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
    // move to another player
    // someFunction(player?, direction?)
    setCompute(computerPlay(players(), deskCard()));
    setTurns({
      player: false,
      computer: true
    });
    setColorChosenFromComputer("");
    return;
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
