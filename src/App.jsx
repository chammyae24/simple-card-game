import { Routes, Route, useLocation } from "solid-app-router";
import UnoGame from "./UNO/UnoGame";
import Home from "./Home";
import { createEffect, createSignal, onMount } from "solid-js";

import music from "./audio/music.mp3";
import Setting from "./Setting";
// import sfx1 from "./audio/card-sfx.wav";
// import sfx2 from "./audio/card-sfx-02.wav";
// import sfx3 from "./audio/card-sfx-03.wav";
// import sfx4 from "./audio/card-sfx-04.wav";
// import sfx5 from "./audio/card-sfx-05.wav";

function App() {
  const [home, setHome] = createSignal(true);

  const [sound, setSound] = createSignal(null);
  const [bg, setBG] = createSignal(null);
  const [play, setPlay] = createSignal(null);
  const [mute, setMute] = createSignal(true);

  let audioBg;
  let audioSound;

  onMount(() => {
    // console.log(audioBg);
    // if (mute()) return;
    audioSound.volume = 0.5;
    setPlay(audioSound);
    audioBg.volume = 0.5;
    audioBg.loop = true;
    setBG(audioBg);
  });

  createEffect(() => {
    if (bg() === null) return;
    if (!mute()) {
      bg().play();
    } else {
      bg().pause();
      bg().currentTime = 0;
    }
  });

  createEffect(() => {
    if (useLocation().pathname !== "/") setHome(false);
  });

  createEffect(() => {
    console.log(mute());
  });

  return (
    <>
      {home() && <Home setHome={setHome} />}
      <Routes>
        <Route
          path="/uno"
          element={
            <UnoGame setHome={setHome} setSound={setSound} play={play} />
          }
        />
      </Routes>

      <Setting setMute={setMute} mute={mute} />

      <audio src={music} ref={audioBg}></audio>
      <audio src={sound()} ref={audioSound}></audio>
    </>
  );
}

export default App;
