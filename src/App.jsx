import { Routes, Route, useLocation } from "solid-app-router";
import UnoGame from "./UNO/UnoGame";
import Home from "./Home";
import { createEffect, createSignal, onMount } from "solid-js";

import music from "./audio/music.mp3";
// import sfx1 from "./audio/card-sfx.wav";
// import sfx2 from "./audio/card-sfx-02.wav";
// import sfx3 from "./audio/card-sfx-03.wav";
// import sfx4 from "./audio/card-sfx-04.wav";
// import sfx5 from "./audio/card-sfx-05.wav";

function App() {
  const [home, setHome] = createSignal(true);

  const [sound, setSound] = createSignal(null);
  const [bg, setBG] = createSignal(music);
  const [play, setPlay] = createSignal(null);
  const [mute, setMute] = createSignal(true);

  let audioBg;
  let audioSound;

  onMount(() => {
    // console.log(audioBg);
    if (mute) return;
    audioSound.volume = 0.5;
    setPlay(audioSound);
  });

  createEffect(() => {
    if (useLocation().pathname !== "/") setHome(false);
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

      <audio src={bg()} ref={audioBg}></audio>
      <audio src={sound()} ref={audioSound}></audio>
    </>
  );
}

export default App;
