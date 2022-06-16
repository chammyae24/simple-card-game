import { Link } from "solid-app-router";

export default function Home({ setHome }) {
  return (
    <div style={home}>
      <div style={linkContainer}>
        <Link style={link} href="/uno">
          UNO
        </Link>
      </div>
      <div style={linkContainer}>
        <Link style={link} href="/123">
          Coming Soon...
        </Link>
      </div>
      <div style={linkContainer}>
        <Link style={link} href="/456">
          Coming Soon...
        </Link>
      </div>
    </div>
  );
}

const home = {
  display: "flex",
  height: "100vh",
  "flex-direction": "column",
  "justify-content": "center",
  "align-items": "center"
};

const link = {
  "text-decoration": "none",
  color: "white",
  "font-size": "20px",
  "font-family": "Fredoka One, cursive",
  color: "#ffc107"
};

const linkContainer = {
  width: "250px",
  "text-align": "center",
  background: "#5b3fd8",
  padding: "7px",
  "border-radius": "5px",
  margin: "5px 0",
  "box-shadow": "10px 10px 10px rgba(0,0,0,0.5)"
};
