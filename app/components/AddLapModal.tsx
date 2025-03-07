import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Compound, Lap, LapType } from "../types";
import { COMPOUNDS, LAP_TYPES } from "../constants";
import { FaPlus } from "react-icons/fa6";

type Props = {
  changeLap: (lap: Lap, lapNumber: number) => void;
  lapNumber: number;
  close: () => void;
};

const AddLapModal: React.FC<Props> = ({ changeLap, lapNumber, close }) => {
  const [lapType, setLapType] = useState<LapType>("Lap");
  const [compound, setCompound] = useState<Compound>("Soft");
  const [lapTime, setLapTime] = useState(1000);
  const [tireLife, setTireLife] = useState(1);

  const changeLapType = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setLapType(event.target.value as LapType);

  const changeCompound = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCompound(event.target.value as Compound);

  const changeLapTime = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLapTime(Number(event.target.value));

  const changeTireLife = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTireLife(Number(event.target.value));

  const handleSubmit = () => {
    changeLap({ lapType, compound, lapTime, tireLife }, lapNumber);
    close();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-brightness-75 z-10">
      <div className="relative flex flex-col gap-10 items-center bg-white p-5 rounded drop-shadow h-1/2 w-1/2">
        <button onClick={close} className="absolute top-5 right-5">
          <IoClose className="text-3xl" />
        </button>

        <h2 className="text-center font-bold uppercase text-4xl">
          Set Lap {lapNumber}
        </h2>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor="Lap Type" className="font-medium uppercase">
              Lap Type
            </label>
            <select
              name="Lap Type"
              value={lapType}
              onChange={changeLapType}
              className="border border-gray-300 rounded p-1 drop-shadow"
            >
              {LAP_TYPES.map(option => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="Lap Time" className="font-medium uppercase">
              Lap Time
            </label>
            <input
              name="Lap Time"
              type="number"
              value={lapTime}
              onChange={changeLapTime}
              className="border border-gray-300 rounded p-1 drop-shadow"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="Tire Compound" className="font-medium uppercase">
              Tire Compound
            </label>
            <select
              name="Tire Compound"
              value={compound}
              onChange={changeCompound}
              className="border border-gray-300 rounded p-1 drop-shadow"
            >
              {COMPOUNDS.map(option => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="Tire Life" className="font-medium uppercase">
              Tire Life
            </label>
            <input
              name="Tire Life"
              type="number"
              value={tireLife}
              onChange={changeTireLife}
              className="border border-gray-300 rounded p-1 drop-shadow"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-1 bg-gray-900 text-white px-20 py-3 uppercase rounded transition-colors hover:bg-gray-800"
        >
          <FaPlus />
          Set
        </button>
      </div>
    </div>
  );
};

export default AddLapModal;
