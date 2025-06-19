import { COMPOUNDS } from "../constants";
import { formatRaceTime } from "../utils";

type Props = {
  strategies: {
    time: number;
    laps: number[];
    combo: number[];
  }[];
};

const Strategy: React.FC<Props> = ({ strategies }) => (
  <div className="flex flex-col gap-6 p-5 mt-7">
    <h2 className="text-4xl font-bold text-center text-white uppercase">
      Top 5 Strategies
    </h2>
    <div className="flex flex-col gap-4">
      {strategies.map((strategy, index) => (
        <div
          key={index * 100}
          className="bg-neutral-600 text-white rounded flex flex-col justify-center items-center drop-shadow p-4"
        >
          <h2 className="font-bold text-xl py-2 px-24 rounded-xl uppercase bg-neutral-700">
            Strategy {index + 1}
          </h2>
          <p className="text-lg font-medium">
            Time: {formatRaceTime(strategy.time)}
          </p>
          <p className="text-lg font-medium">
            Stints: {strategy.laps.join(", ")}
          </p>
          <p className="text-lg font-medium">
            Combo:{" "}
            {strategy.combo.map(compound => COMPOUNDS[compound]).join(", ")}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default Strategy;
