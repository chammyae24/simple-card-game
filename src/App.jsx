import { Routes, Route, useLocation } from "solid-app-router";
import UnoGame from "./UNO/UnoGame";
import Home from "./Home";
import { createEffect, createSignal, onMount } from "solid-js";

import music from "./audio/music.mp3";
import Setting from "./Setting";
import sfx2 from "./audio/card-sfx-02.wav";
import sfx3 from "./audio/card-sfx-03.wav";
import winSound from "./audio/win.mp3";
import loseSound from "./audio/lose.mp3";
import MemoryGame from "./Memory/MemoryGame";
import MonteGame from "./Monte/MonteGame";
import BlackJack from "./BlackJack/BlackJack";

function App() {
  const [home, setHome] = createSignal(true);

  const [bg, setBG] = createSignal(null);
  const [soundEffect, setSoundEffect] = createSignal(null);
  const [soundEffect2, setSoundEffect2] = createSignal(null);
  const [mute, setMute] = createSignal(true);
  const [sfxMute, setSfxMute] = createSignal(false);

  const [winSfx, setWinSfx] = createSignal(null);
  const [loseSfx, setLoseSfx] = createSignal(null);

  let audioBg;
  let audioSound;
  let audioSound2;
  let audioWin;
  let audioLose;

  onMount(() => {
    audioSound.volume = 0.5;
    setSoundEffect(audioSound2);
    audioSound2.volume = 0.5;
    setSoundEffect2(audioSound);
    audioBg.volume = 0.5;
    audioBg.loop = true;
    setBG(audioBg);

    audioWin.volume = 0.5;
    setWinSfx(audioWin);
    audioLose.volume = 0.5;
    setLoseSfx(audioLose);
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

  return (
    <>
      {/* {home() && <Home setHome={setHome} />} */}
      <Routes>
        <Route path="/" element={<Home setHome={setHome} />} />
        <Route
          path="/uno"
          element={
            <UnoGame
              setHome={setHome}
              soundEffect={soundEffect}
              soundEffect2={soundEffect2}
              winSfx={winSfx}
              loseSfx={loseSfx}
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
              winSfx={winSfx}
              loseSfx={loseSfx}
            />
          }
        />
        <Route
          path="/monte"
          element={
            <MonteGame
              setHome={setHome}
              soundEffect={soundEffect}
              soundEffect2={soundEffect2}
              winSfx={winSfx}
              loseSfx={loseSfx}
            />
          }
        />
        <Route
          path="/blackjack"
          element={
            <BlackJack
              setHome={setHome}
              soundEffect2={soundEffect2}
              winSfx={winSfx}
              loseSfx={loseSfx}
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
      <audio src={winSound} ref={audioWin}></audio>
      <audio src={loseSound} ref={audioLose}></audio>
    </>
  );
}

export default App;
