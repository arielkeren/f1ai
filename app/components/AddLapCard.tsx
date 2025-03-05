import useModal from "../hooks/useModal";
import { Lap } from "../types";
import AddLapModal from "./AddLapModal";

type Props = {
  addLap: (lap: Lap) => void;
};

const AddLapCard: React.FC<Props> = ({ addLap }) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div
        onClick={open}
        className="bg-blue-500 text-white p-4 text-6xl flex justify-center items-center rounded cursor-pointer"
      >
        +
      </div>

      {isOpen && <AddLapModal addLap={addLap} close={close} />}
    </>
  );
};

export default AddLapCard;
