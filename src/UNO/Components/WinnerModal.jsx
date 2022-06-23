import { Link } from "solid-app-router";

export default function WinnerModal({
  players,
  winner,
  setWinner,
  setHome,
  refresh
}) {
  const closeWinner = () => {
    setWinner({
      over: false,
      winner: "",
      loser: ""
    });
    refresh();
  };
  return (
    <div style={modalBackground}>
      <div style={modalCard}>
        <h2 style={modalHeader}>{winner().winner} wins</h2>
        <p class="mb-4">
          {winner().loser} have{" "}
          {players()[winner().loser === "You" ? 1 : 0].cards.length} cards left.
        </p>
        <div style={buttonContainer}>
          <button style={btn} class="btn" onClick={closeWinner}>
            Play Again
          </button>
          <Link style={btn} class="btn" href="/" onClick={() => setHome(true)}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const modalBackground = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  background: "rgba(0, 0, 0, 0.7)",
  "z-index": 10
};

const modalCard = {
  "background-color": "#fff",
  color: "#ff0000",
  "text-align": "center",
  padding: "30px",
  border: "3px solid #5b3fd8",
  "border-radius": "10px"
};

const modalHeader = {
  "margin-bottom": "20px",
  color: "#5b3fd8",
  "font-family": "Fredoka One, cursive"
};

const buttonContainer = {
  "min-width": "300px",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  gap: "10px",
  color: "#5b3fd8"
};

const btn = {
  width: "100%",
  "background-color": "#5b3fd8",
  color: "yellow"
};
