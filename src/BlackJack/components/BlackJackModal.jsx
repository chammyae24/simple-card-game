import { Link } from "solid-app-router";

export default function BlackJackModal({ setHome, wining, refresh }) {
  return (
    <div style={modalBG}>
      <div style={modalCard}>
        {wining().draw ? (
          <h1 class="mb-3">Draw</h1>
        ) : (
          <h1 class="mb-3">{wining().win ? "You Win!" : "Sorry!"}</h1>
        )}
        <div class="mb-3">
          <p class="mb-1">
            Your sums:{" "}
            {wining().sums.player === 21 ? "Black Jack" : wining().sums.player}
          </p>
          <p class="mb-1">
            Dealer sums:{" "}
            {wining().sums.dealer === 21 ? "Black Jack" : wining().sums.dealer}
          </p>
        </div>
        <div>
          <Link
            href="/"
            onClick={() => setHome(true)}
            style={btn}
            class="btn btn-warning mx-2"
          >
            Home
          </Link>
          <button onClick={refresh} style={btn} class="btn btn-warning mx-2">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

const modalBG = {
  position: "fixed",
  top: 0,
  left: 0,
  "background-color": "rgba(0,0,0,0.5)",
  width: "100%",
  height: "100%",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  "z-index": 12
};

const modalCard = {
  "min-width": "300px",
  "background-color": "#fff",
  color: "#570202",
  "text-align": "center",
  padding: "30px",
  border: "3px solid #570202",
  "border-radius": "10px",
  "font-family": "Fredoka One, cursive"
};

const btn = {
  "min-width": "100px"
};
