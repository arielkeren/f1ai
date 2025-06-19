import { useState } from "react"; // Import React useState hook
import Modal from "./Modal"; // Import Modal component

type Props = {
  // Define props type for LapModal
  selectedLapTime: number;
  changeLap: (
    // Function to change lap time
    lapTime: number,
    lapNumber: number,
    compoundIndex: number
  ) => void;
  lapNumber: number; // Current lap number
  compoundIndex: number; // Index of the compound
  close: () => void; // Function to close the modal
};

const LapModal: React.FC<Props> = ({
  // LapModal functional component
  selectedLapTime,
  changeLap, // Destructure changeLap from props
  lapNumber, // Destructure lapNumber from props
  compoundIndex, // Destructure compoundIndex from props
  close, // Destructure close from props
}) => {
  const [lapTime, setLapTime] = useState(
    selectedLapTime === 0 ? 90 : selectedLapTime
  ); // State for lap time, default 90

  const changeLapTime = (
    event: React.ChangeEvent<HTMLInputElement> // Handler for input change
  ) => setLapTime(Number(event.target.value)); // Update lapTime state

  const handleSubmit = () => {
    // Handler for submit
    changeLap(lapTime * 1000, lapNumber, compoundIndex); // Call changeLap with lapTime in ms
    close(); // Close the modal
  };

  return (
    <Modal title={`Set Lap ${lapNumber}`} submit={handleSubmit} close={close}>
      {" "}
      {/* Render Modal component */}
      <label htmlFor="Lap Time" className="font-medium uppercase">
        {" "}
        {/* Label for input */}
        Lap Time (Seconds)
      </label>
      <input
        name="Lap Time" // Name of the input
        type="number" // Input type is number
        value={lapTime} // Value bound to lapTime state
        onChange={changeLapTime} // On change handler
        className="border border-gray-300 rounded p-1 drop-shadow" // Styling classes
      />
    </Modal>
  );
};

export default LapModal; // Export
