import { useState } from "react";
import Modal from "./Modal";

type Props = {
  changeLap: (lapTime: number, lapNumber: number) => void;
  lapNumber: number;
  close: () => void;
};

const LapModal: React.FC<Props> = ({ changeLap, lapNumber, close }) => {
  const [lapTime, setLapTime] = useState(1000);

  const changeLapTime = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLapTime(Number(event.target.value));

  const handleSubmit = () => {
    changeLap(lapTime, lapNumber);
    close();
  };

  return (
    <Modal title={`Set Lap ${lapNumber}`} submit={handleSubmit} close={close}>
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
    </Modal>
  );
};

export default LapModal;
