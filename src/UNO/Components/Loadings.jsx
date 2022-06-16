export default function Loadings() {
  return (
    <div style={loadingBackground}>
      <div style={loadingContainer}>
        <i class="fas fa-spinner load"></i> Computer thinking...
      </div>
    </div>
  );
}

const loadingBackground = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  "background-color": "rgba(0,0,0,0.5)",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  "z-index": 10
};

const loadingContainer = {
  //   width: "150px",
  "text-align": "center",
  "background-color": "#fff",
  color: "#5b3fd8",
  padding: "10px",
  border: "2px solid #5b3fd8",
  "border-radius": "10px",
  "font-size": "20px",
  "font-family": "Fredoka One, cursive"
};
