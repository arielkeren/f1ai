import { Compound } from "../types";
import LapCard from "./LapCard";
import PitStop from "./PitStop";

type Props = {
  strategy: (number[] | Compound)[];
};

const Strategy: React.FC<Props> = ({ strategy }) => (
  <div className="grid grid-cols-3 gap-4 p-5">
    {strategy.map((current, index) =>
      typeof current === "string" ? (
        <PitStop compound={current} key={index} />
      ) : (
        <LapCard
          lapTime={current[0]}
          lapNumber={current[1]}
          changeLap={() => {}}
          isEditable={false}
          key={index}
        />
      )
    )}
  </div>
);

export default Strategy;
