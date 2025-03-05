import useModal from "../hooks/useModal";
import { Lap } from "../types";
import AddLapModal from "./AddLapModal";
import { FaPlus } from "react-icons/fa6";

type Props = {
  addLap: (lap: Lap) => void;
};

const AddLapCard: React.FC<Props> = ({ addLap }) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div
        onClick={open}
        className="bg-gray-900 text-white p-4 text-4xl flex justify-center items-center rounded cursor-pointer h-24 transition-colors hover:bg-gray-800"
      >
        <FaPlus />
      </div>

      {isOpen && <AddLapModal addLap={addLap} close={close} />}
    </>
  );
};

export default AddLapCard;
