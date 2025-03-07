import { FaPlus } from "react-icons/fa6";
import useModal from "../hooks/useModal";
import { Lap } from "../types";
import { formatLapTime } from "../utils";
import AddLapModal from "./AddLapModal";

type Props = {
  lap: Lap | null;
  lapNumber: number;
  changeLap: (lap: Lap, lapNumber: number) => void;
};

const LapCard: React.FC<Props> = ({ lap, lapNumber, changeLap }) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      {lap ? (
        <div
          onClick={open}
          className="bg-gray-100 rounded flex flex-col justify-center items-center drop-shadow h-24 cursor-pointer transition-colors hover:bg-gray-200"
        >
          <h2 className="uppercase font-bold text-xl">Lap {lapNumber}</h2>
          <p className="font-medium uppercase">
            {formatLapTime(lap.lapTime)}, {lap.lapType}, {lap.compound},{" "}
            {lap.tireLife}
          </p>
        </div>
      ) : (
        <div
          onClick={open}
          className="bg-gray-900 p-4 flex flex-col justify-center items-center rounded cursor-pointer h-24 drop-shadow transition-colors hover:bg-gray-800"
        >
          <h2 className="font-bold uppercase text-xl text-white">
            Lap {lapNumber}
          </h2>
          <FaPlus className="text-xl text-white" />
        </div>
      )}

      {isOpen && (
        <AddLapModal
          changeLap={changeLap}
          lapNumber={lapNumber}
          close={close}
        />
      )}
    </>
  );
};

export default LapCard;
