export default function Setting({ setMute, mute }) {
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
      <div style={btnContainer}>
        <i class="fas fa-volume-up"></i>
      </div>
      <div style={btnContainer}>
        <i class="fas fa-vest-patches"></i>
      </div>
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
