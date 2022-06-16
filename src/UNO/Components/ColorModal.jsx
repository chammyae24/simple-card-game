import { computerPlay } from "../utils/gameLogic";

export default function ColorModal(props) {
  document.body.scrollTop = 0;
  const {
    setChosenColor,
    setColorModal,
    players,
    chosenColor,
    deskCard,
    setCompute,
    setTurns
  } = props;

  const chooseColor = color => {
    setChosenColor(color);
    setColorModal(false);
    setCompute(computerPlay(players(), deskCard(), chosenColor()));
    setTurns({
      player: false,
      computer: true
    });
  };

  return (
    <div style={modalBackground}>
      <div style={modalCard}>
        <h3 style={modalHeader}>Choose Color</h3>
        <div style={buttonContainer}>
          <button
            onClick={() => chooseColor("red")}
            class="btn"
            style={{ "background-color": "red", color: "#fff" }}
          >
            Red
          </button>
          <button
            onClick={() => chooseColor("green")}
            class="btn"
            style={{ "background-color": "green", color: "#fff" }}
          >
            Green
          </button>
          <button
            onClick={() => chooseColor("blue")}
            class="btn"
            style={{ "background-color": "blue", color: "#fff" }}
          >
            Blue
          </button>
          <button
            onClick={() => chooseColor("yellow")}
            class="btn"
            style={{ "background-color": "yellow", color: "#5b3fd8" }}
          >
            Yellow
          </button>
        </div>
      </div>
    </div>
  );
}

const modalBackground = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  background: "rgba(0, 0, 0, 0.7)",
  "z-index": 10
};

const modalCard = {
  "background-color": "#fff",
  color: "#5b3fd8",
  "text-align": "center",
  padding: "30px",
  "font-family": "Fredoka One, cursive",
  "border-radius": "10px",
  "box-shadow": "5px 5px 5px rgba(0, 0, 0, 0.7)"
};

const modalHeader = {
  "margin-bottom": "20px"
};

const buttonContainer = {
  display: "flex",
  "flex-direction": "column",
  gap: "10px",
  color: "#5b3fd8"
};
