import Club from "../../Cards/Club";
import Diamond from "../../Cards/Diamond";
import Heart from "../../Cards/Heart";
import Jack from "../../Cards/Jack";
import King from "../../Cards/King";
import Queen from "../../Cards/Queen";
import Spade from "../../Cards/Spade";

import "./blackJackCard.scss";

export default function Card({ card }) {
  const getType = type => {
    switch (type) {
      case "diam":
        return <Diamond />;
      case "heart":
        return <Heart />;
      case "club":
        return <Club />;
      case "spade":
        return <Spade />;
    }
  };

  const getContent = card => {
    switch (card.value) {
      case "K":
        return <King />;
      case "Q":
        return <Queen />;
      case "J":
        return <Jack />;
      case "A":
        return "A";
      default:
        return getType(card.type);
    }
  };

  return (
    <div class="bjcard-container">
      <div class="top" style={{ color: card.color }}>
        <span>{card.value}</span>
        <span>{getType(card.type)}</span>
      </div>
      <div class="bottom" style={{ color: card.color }}>
        <span>{card.value}</span>
        <span>{getType(card.type)}</span>
      </div>
      <div
        class={`bj-content ${card.value} ${card.type}`}
        style={{
          color: card.color,
          fill: card.color
        }}
      >
        {getContent(card)}
      </div>
    </div>
  );
}
