import { Compound } from "../types";
import LapCard from "./LapCard";
import PitStop from "./PitStop";

type Props = {
  strategy: (number | Compound)[];
};

const Strategy: React.FC<Props> = ({ strategy }) => (
  <div className="grid grid-cols-3 gap-4 p-5">
    {strategy.map((current, index) =>
      typeof current === "number" ? (
        <LapCard
          lapTime={current}
          lapNumber={index + 4}
          changeLap={() => {}}
          isEditable={false}
          key={index}
        />
      ) : (
        <PitStop compound={current} key={index} />
      )
    )}
  </div>
);

export default Strategy;
