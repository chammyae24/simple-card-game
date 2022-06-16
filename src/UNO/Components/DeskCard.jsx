import UnoCard from "./UnoCard";

export default function DeskCard(props) {
  const { deskCard } = props;

  return (
    <div>
      <UnoCard
        uno={null}
        deskCard={deskCard}
        size={{ width: "90px", height: "130px" }}
      />
    </div>
  );
}
