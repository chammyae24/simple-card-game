import { createSignal, createEffect } from "solid-js";

export default function Setting({ setMute, mute, setSfxMute, sfxMute }) {
  const [bgColor, setBgColor] = createSignal("#002350");
  const [fgColor, setFgColor] = createSignal("#007b1a");

  const [show, setShow] = createSignal(false);

  const bgChange = e => {
    // console.log(e.target.value);
    setBgColor(e.target.value);
  };

  const fgChange = e => {
    // console.log(e.target.value);
    setFgColor(e.target.value);
  };

  const reset = () => {
    setBgColor("#002350");
    setFgColor("#007b1a");
  };

  createEffect(() => {
    document.body.style.setProperty("--back-color", bgColor());
    document.body.style.setProperty("--fore-color", fgColor());
  });

  return (
    <div style={settingContainer}>
      <div
        style={{
          ...btnContainer,
          "--color-c": mute() ? "#fff" : "#ffc107",
          opacity: mute() ? 0.5 : 1
        }}
        onClick={() => setMute(m => !m)}
      >
        <i class="fa-solid fa-music"></i>
      </div>
      <div
        style={{
          ...btnContainer,
          "--color-c": sfxMute() ? "#fff" : "#ffc107",
          opacity: sfxMute() ? 0.5 : 1
        }}
        onClick={() => setSfxMute(m => !m)}
      >
        <i class="fas fa-volume-up"></i>
      </div>
      <div
        style={{
          ...btnContainer,
          "--color-c": show() ? "#fff" : "#ffc107",
          opacity: show() ? 0.5 : 1
        }}
        onClick={() => setShow(s => !s)}
      >
        <i class="fas fa-vest-patches"></i>
      </div>
      {show() && (
        <div style={themeContainer}>
          <div style={colorChoose}>
            <label>background: </label>
            <input type="color" value={bgColor()} onInput={bgChange} />
          </div>
          <div style={colorChoose}>
            <label>foreground: </label>
            <input type="color" value={fgColor()} onInput={fgChange} />
          </div>
          <button class="btn btn-warning" onClick={reset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

const settingContainer = {
  background: "rgba(0,0,0,0.5)",
  width: "50px",
  "border-radius": "10px 0 0 10px",
  padding: "10px",
  position: "absolute",
  top: "50%",
  right: 0,
  transform: "translateY(-50%)"
};

const btnContainer = {
  "--color-c": "#ffc107",
  width: "30px",
  height: "30px",
  border: "1px solid var(--color-c)",
  color: "var(--color-c)",
  "border-radius": "50%",
  margin: "10px 0",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  cursor: "pointer"
};

const themeContainer = {
  position: "absolute",
  width: "180px",
  bottom: 0,
  left: "-190px",
  display: "flex",
  "flex-direction": "column",
  gap: "10px",
  background: "rgba(0,0,0,0.5)",
  padding: "10px",
  "border-radius": "10px"
};

const colorChoose = {
  display: "flex",
  "justify-content": "space-between",
  "align-items": "center",
  color: "#ffc107"
};
