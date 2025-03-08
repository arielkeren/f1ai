import { Lap } from "../types";
import LapCard from "./LapCard";

type Props = {
  laps: (Lap | null)[];
  changeLap: (lap: Lap, lapNumber: number) => void;
};

const InitialLaps: React.FC<Props> = ({ laps, changeLap }) => (
  <div className="grid grid-cols-3 gap-4 p-5">
    {laps.map((lap, index) => (
      <LapCard
        lap={lap}
        lapNumber={index + 1}
        changeLap={changeLap}
        key={index}
      />
    ))}
  </div>
);

export default InitialLaps;
