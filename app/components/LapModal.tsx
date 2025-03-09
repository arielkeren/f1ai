import { useState } from "react";
import { Compound, Lap, LapType } from "../types";
import { COMPOUNDS, LAP_TYPES } from "../constants";
import Modal from "./Modal";

type Props = {
  changeLap: (lap: Lap, lapNumber: number) => void;
  lapNumber: number;
  close: () => void;
};

const LapModal: React.FC<Props> = ({ changeLap, lapNumber, close }) => {
  const [lapType, setLapType] = useState<LapType>("Lap");
  const [compound, setCompound] = useState<Compound>("SOFT");
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
    <Modal title={`Set Lap ${lapNumber}`} submit={handleSubmit} close={close}>
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
    </Modal>
  );
};

export default LapModal;
