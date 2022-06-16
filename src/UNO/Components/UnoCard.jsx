import { createEffect, createSignal } from "solid-js";
import ColorCard from "./ColorCard";
import "./unoCard.css";
import WildCard from "./WildCard";

export default function UnoCard(props) {
  const { uno, size, deskCard } = props;

  return (
    <div class="card front" style={size}>
      {
        <div
          class={`inner-card ${(uno || deskCard()).color}`}
          style={uno ? null : border}
        >
          {(uno || deskCard()).role === "change-color" ? (
            <WildCard />
          ) : (
            <ColorCard uno={uno} deskCard={deskCard} size={uno ? null : size} />
          )}
        </div>
      }
    </div>
  );
}

const border = {
  border: "5px solid #fff",
  "box-shadow": "5px 5px 10px rgba(0,0,0,0.5)"
};
