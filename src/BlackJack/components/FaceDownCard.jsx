import Card from "./Card";

import "./faceDown.scss";

export default function FaceDownCard({ card, turned }) {
  return (
    <div class={`face ${turned() && "turned"}`}>
      <div class="bj-back"></div>
      <div class="bj-front">
        <Card card={card} />
      </div>
    </div>
  );
}
