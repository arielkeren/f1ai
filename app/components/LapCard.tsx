import { FaPlus } from "react-icons/fa6";
import useModal from "../hooks/useModal";
import { formatLapTime } from "../utils";
import LapModal from "./LapModal";

type Props = {
  lapTime: number;
  lapNumber: number;
  compoundIndex: number;
  changeLap: (
    lapTime: number,
    lapNumber: number,
    compoundIndex: number
  ) => void;
  isEditable: boolean;
};

const LapCard: React.FC<Props> = ({
  lapTime,
  lapNumber,
  compoundIndex,
  changeLap,
  isEditable,
}) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      {lapTime ? (
        <div
          onClick={isEditable ? open : undefined}
          className="bg-gray-100 rounded flex flex-col justify-center items-center drop-shadow h-24 cursor-pointer transition-colors hover:bg-gray-200"
        >
          <h2 className="uppercase font-bold text-xl">Lap {lapNumber}</h2>
          <p className="font-medium uppercase">{formatLapTime(lapTime)}</p>
        </div>
      ) : (
        <div
          onClick={open}
          className="bg-neutral-600 p-4 flex flex-col justify-center items-center rounded cursor-pointer h-24 drop-shadow transition-colors hover:bg-gray-500"
        >
          <h2 className="font-bold uppercase text-xl text-white">
            Lap {lapNumber}
          </h2>
          <FaPlus className="text-xl text-white" />
        </div>
      )}

      {isOpen && (
        <LapModal
          selectedLapTime={lapTime / 1000}
          changeLap={changeLap}
          lapNumber={lapNumber}
          compoundIndex={compoundIndex}
          close={close}
        />
      )}
    </>
  );
};

export default LapCard;
