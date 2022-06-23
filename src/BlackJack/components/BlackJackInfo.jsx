export default function BlackJackInfo({ setBlackJackInfo }) {
  return (
    <div style={ruleBg}>
      <div style={ruleCard}>
        <h2 class="text-center mb-3">NOTICES</h2>
        <ol>
          <li>
            card <span style={red}>"2"</span> to <span style={red}>"10"</span>{" "}
            have their values respectively.
          </li>
          <li>
            You can consider <span style={red}>"Aces"</span> as value{" "}
            <span style={red}>"1"</span> or <span style={red}>"11"</span>.
          </li>
          <li>
            You can consider <span style={red}>"Jack"</span>,{" "}
            <span style={red}>"Queen"</span> and <span style={red}>"King"</span>{" "}
            as value <span style={red}>"10"</span>.
          </li>
          <li>
            You have to beat the dealer by getting a count as close to 21 as
            possible, without going over 21.
          </li>
        </ol>
        <p>Tip: guess the sum of Dealer first.</p>
        <hr />
        <div style={para}>
          <h6>Sorry</h6>
          <p>
            The interface and styles are better looking in large screens. I try
            my best for mobile devices. However, I'm not sure about the devices
            smaller than iPhone8 or iPhoneSE.
          </p>
        </div>
        <div style={closeBtn} onClick={() => setBlackJackInfo(false)}>
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

const red = {
  color: "red"
};
