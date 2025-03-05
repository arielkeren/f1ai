import { Lap } from "../types";

type Props = {
  lap: Lap;
  lapNumber: number;
};

const formatLapTime = (ms: number) => {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let milliseconds = ms % 1000;

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
};

const LapCard: React.FC<Props> = ({ lap, lapNumber }) => {
  return (
    <div className="bg-gray-100 rounded flex flex-col justify-center items-center drop-shadow h-24">
      <h2 className="uppercase font-bold text-xl">Lap {lapNumber}</h2>
      <p className="font-medium uppercase">
        {formatLapTime(lap.lapTime)}, {lap.lapType}, {lap.compound},{" "}
        {lap.tireLife}
      </p>
    </div>
  );
};

export default LapCard;
