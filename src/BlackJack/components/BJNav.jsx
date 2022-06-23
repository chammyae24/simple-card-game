import { Link } from "solid-app-router";

export default function BJNav({ setHome, setBlackJackInfo }) {
  return (
    <div style={navContainer}>
      <p style={logo}>Black Jack</p>
      <div style={linkContainer}>
        <button
          class="btn d-flex justify-content-center align-items-center text-warning"
          onClick={() => setBlackJackInfo(true)}
        >
          <i class="fa-solid fa-circle-info"></i>
        </button>
        <Link href="/" onClick={() => setHome(true)} style={ref}>
          Home
        </Link>
      </div>
    </div>
  );
}

const navContainer = {
  width: "100%",
  display: "flex",
  padding: "15px 10px",
  "justify-content": "space-between",
  "align-items": "center",
  "background-color": "rgba(0, 0, 0, 0.5)",
  "margin-bottom": "10px",
  position: "sticky",
  top: 0,
  "z-index": 12
};

const linkContainer = {
  display: "flex",
  gap: "10px"
};

const logo = {
  "font-family": "Fredoka One, cursive",
  color: "#ffc107",
  "font-size": "30px",
  margin: 0,
  "margin-left": "10px"
};

const ref = {
  "background-color": "#5b3fd8",
  color: "#fff",
  "text-decoration": "none",
  padding: "10px 20px",
  "border-radius": "5px",
  cursor: "pointer"
};
