import { COMPOUNDS } from "../constants";
import LapCard from "./LapCard";

type Props = {
  lapTimes: number[][];
  changeLap: (
    lapTime: number,
    lapNumber: number,
    compoundIndex: number
  ) => void;
};

const InitialLaps: React.FC<Props> = ({ lapTimes, changeLap }) => (
  <div className="grid grid-cols-3 gap-4 p-5">
    {lapTimes.map((compoundLapTime, index) => (
      <div className="flex flex-col gap-4" key={index}>
        <h2 className="text-2xl font-bold text-center text-white">
          {COMPOUNDS[index]}
        </h2>
        {compoundLapTime.map((lapTime, lapIndex) => (
          <LapCard
            lapTime={lapTime}
            lapNumber={lapIndex + 1}
            compoundIndex={index}
            changeLap={changeLap}
            isEditable={true}
            key={index * 3 + lapIndex}
          />
        ))}
      </div>
    ))}
  </div>
);

export default InitialLaps;
