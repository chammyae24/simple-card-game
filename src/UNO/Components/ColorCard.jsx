export default function ColorCard({ uno, size, deskCard }) {
  return (
    <div class={`oval ${(uno || deskCard()).role}`}>
      <span class="text top" style={size ? text : ""}>
        {cardContentGetter(uno || deskCard())}
      </span>
      <span class="text bottom" style={size ? text : ""}>
        {cardContentGetter(uno || deskCard())}
      </span>
      <div
        class={`content ${(uno || deskCard()).color}`}
        style={size ? content : ""}
      >
        {cardContentGetter(uno || deskCard())}
      </div>
    </div>
  );
}

const content = {
  "font-size": "50px"
};

const text = {
  "font-size": "17px"
};

function cardContentGetter(uno) {
  let content = "";

  switch (uno.role) {
    case "numbers":
      content = uno.value;
      break;
    case "skip":
      content = <i class="fas fa-ban"></i>;
      break;
    case "reverse":
      content = <i class="fas fa-repeat"></i>;
      break;
    case "draw-2":
      content = "+2";
      break;
    case "draw-4":
      content = "+4";
      break;
    default:
      content = "";
      break;
  }

  return content;
}
