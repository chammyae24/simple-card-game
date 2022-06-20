import { Routes, Route, useLocation } from "solid-app-router";
import UnoGame from "./UNO/UnoGame";
import Home from "./Home";
import { createEffect, createSignal, onMount } from "solid-js";

import music from "./audio/music.mp3";
import Setting from "./Setting";
import sfx2 from "./audio/card-sfx-02.wav";
import sfx3 from "./audio/card-sfx-03.wav";
import MemoryGame from "./Memory/MemoryGame";

function App() {
  const [home, setHome] = createSignal(true);

  const [bg, setBG] = createSignal(null);
  const [soundEffect, setSoundEffect] = createSignal(null);
  const [soundEffect2, setSoundEffect2] = createSignal(null);
  const [mute, setMute] = createSignal(true);
  const [sfxMute, setSfxMute] = createSignal(false);

  let audioBg;
  let audioSound;
  let audioSound2;

  onMount(() => {
    audioSound.volume = 0.5;
    setSoundEffect(audioSound2);
    audioSound2.volume = 0.5;
    setSoundEffect2(audioSound);
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
    if (sfxMute()) {
      setSoundEffect(null);
      setSoundEffect2(null);
    } else {
      setSoundEffect(audioSound);
      setSoundEffect2(audioSound2);
    }
  });

  createEffect(() => {
    if (useLocation().pathname !== "/") setHome(false);
  });

  createEffect(() => {
    // console.log(mute());
  });

  return (
    <>
      {home() && <Home setHome={setHome} />}
      <Routes>
        <Route
          path="/uno"
          element={
            <UnoGame
              setHome={setHome}
              soundEffect={soundEffect}
              soundEffect2={soundEffect2}
            />
          }
        />
        <Route
          path="/memory"
          element={
            <MemoryGame
              setHome={setHome}
              soundEffect={soundEffect}
              soundEffect2={soundEffect2}
            />
          }
        />
      </Routes>

      <Setting
        setMute={setMute}
        mute={mute}
        setSfxMute={setSfxMute}
        sfxMute={sfxMute}
      />

      <audio src={music} ref={audioBg}></audio>
      <audio src={sfx3} ref={audioSound}></audio>
      <audio src={sfx2} ref={audioSound2}></audio>
    </>
  );
}

export default App;
