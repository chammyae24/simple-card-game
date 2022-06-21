import { Link } from "solid-app-router";

export default function WinMemo({ setHome, shuffle, winMemo, sec }) {
  return (
    <div style={modalBackground}>
      <div style={modalCard}>
        <h1 style={modalHeader}>You{winMemo().win ? " Win!😁" : " Lose!😭"}</h1>
        {winMemo().win ? (
          <>
            <h5>Congratulations!</h5>
            <p>You matched all the cards within {60 - sec()} seconds</p>
          </>
        ) : (
          <>
            <h5>Sorry!</h5>
            <p>
              You have {winMemo().left} pair{winMemo().left > 1 ? "s" : ""} left
              to win.
            </p>
          </>
        )}
        <div style={buttonContainer}>
          <Link href="/" style={btn} class="btn" onClick={() => setHome(true)}>
            Home
          </Link>
          <button style={btn} class="btn" onClick={shuffle}>
            Reset
          </button>
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
  "background-color": "#11182e",
  color: "#ff8800",
  "text-align": "center",
  padding: "30px",
  border: "3px solid #ff8800",
  "border-radius": "10px",
  "text-shadow": "0 0 10px #ff8800"
};

const modalHeader = {
  "margin-bottom": "20px",
  color: "#ff8800",
  "font-family": "Fredoka One, cursive"
};

const buttonContainer = {
  width: "300px",
  display: "flex",
  gap: "10px",
  color: "#ff8800"
};

const btn = {
  width: "100%",
  "background-color": "#ff8800",
  color: "#11182e"
};
