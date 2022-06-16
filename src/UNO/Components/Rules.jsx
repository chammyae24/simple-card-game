export default function Rules({ setInfo }) {
  return (
    <div style={ruleBg}>
      <div style={ruleCard}>
        <h2 class="text-center mb-3">NOTICES</h2>
        <ol>
          <li>You don't have to draw 2 cards, or 4 cards manually.</li>
          <li>You don't have to skip manually.</li>
          <li>
            You can draw a card or skip manually only when you don't have a card
            to place it.
          </li>
          <li>There's nothing else. Play like a normal UNO.</li>
        </ol>
        <hr />
        <div style={para}>
          <h6>Sorry</h6>
          <p>
            The interface and styles are better looking in large screens. I try
            my best for mobile devices. However, I'm not sure about the devices
            smaller than iPhone8 or iPhoneSE.
          </p>
        </div>
        <div style={closeBtn} onClick={() => setInfo(false)}>
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
}

const ruleBg = {
  position: "fixed",
  "z-index": "20",
  "background-color": "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
  display: "flex",
  "justify-content": "center",
  "align-items": "center"
};

const ruleCard = {
  "max-width": "600px",
  "background-color": "#fff",
  color: "black",
  padding: "30px 20px 30px 10px",
  "font-family": "Fredoka One, cursive",
  "border-radius": "10px",
  position: "relative"
};

const para = {
  margin: "0 0 0 15px",
  "font-family": "Roboto"
};

const closeBtn = {
  position: "absolute",
  top: 0,
  right: 0,
  "font-size": "25px",
  padding: "5px 15px",
  cursor: "pointer"
};
