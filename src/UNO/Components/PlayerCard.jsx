import UnoCard from "./UnoCard";
import { computerPlay, playerCardValidate } from "../utils/gameLogic";
import sfx3 from "../../audio/card-sfx-03.wav";

export default function PlayerCard(props) {
  const {
    uno,
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
    colorChosenFromComputer,
    soundEffect2,
    setSkipable
  } = props;

  const check = () => {
    // console.log(deskCard());
    // console.log(playerCardValidate(uno, deskCard(), colorChosenFromComputer()));
    if (!deskCard().skipped) return;
    if (playerCardValidate(uno, deskCard(), colorChosenFromComputer())) {
      if (soundEffect2() !== null) soundEffect2().play();

      setDesks(cards => [uno, ...cards]);
      setDeskCard(uno);

      setPlayers(players => [
        players[0],
        {
          ...players[1],
          cards: players[1].cards.filter(player => player.id !== uno.id)
        }
      ]);
      setSkipable(false);

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
    }
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
