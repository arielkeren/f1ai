import LapCard from "./LapCard";

type Props = {
  lapTimes: number[];
  changeLap: (lapTime: number, lapNumber: number) => void;
};

const InitialLaps: React.FC<Props> = ({ lapTimes, changeLap }) => (
  <div className="grid grid-cols-3 gap-4 p-5">
    {lapTimes.map((lapTime, index) => (
      <LapCard
        lapTime={lapTime}
        lapNumber={index + 1}
        changeLap={changeLap}
        isEditable={true}
        key={index}
      />
    ))}
  </div>
);

export default InitialLaps;
