import { useState } from "react"; // Import React useState hook
import { Driver, Team, Circuit } from "../types"; // Import type definitions
import { DRIVERS, TEAMS, CIRCUIT_NAMES } from "../constants"; // Import constants
import Modal from "./Modal"; // Import Modal component

type Props = {
  // Define props type for RacerModal
  selectedDriver: Driver; // Currently selected driver
  selectedTeam: Team; // Currently selected team
  selectedCircuit: Circuit; // Currently selected circuit
  changeRacer: (driver: Driver, team: Team, circuit: Circuit) => void; // Function to change racer options
  close: () => void; // Function to close the modal
};

const RacerModal: React.FC<Props> = ({
  // RacerModal functional component
  selectedDriver, // Destructure selectedDriver from props
  selectedTeam, // Destructure selectedTeam from props
  selectedCircuit, // Destructure selectedCircuit from props
  changeRacer, // Destructure changeRacer from props
  close, // Destructure close from props
}) => {
  const [driver, setDriver] = useState<Driver>(selectedDriver); // State for driver selection
  const [team, setTeam] = useState<Team>(selectedTeam); // State for team selection
  const [circuit, setCircuit] = useState<Circuit>(selectedCircuit); // State for circuit selection

  const changeDriver = (
    event: React.ChangeEvent<HTMLSelectElement> // Handler for driver select change
  ) => setDriver(event.target.value as Driver); // Update driver state

  const changeTeam = (
    event: React.ChangeEvent<HTMLSelectElement> // Handler for team select change
  ) => setTeam(event.target.value as Team); // Update team state

  const changeCircuit = (
    event: React.ChangeEvent<HTMLSelectElement> // Handler for circuit select change
  ) => setCircuit(event.target.value as Circuit); // Update circuit state

  const handleSubmit = () => {
    // Handler for submit
    changeRacer(driver, team, circuit); // Call changeRacer with selected options
    close(); // Close the modal
  };

  return (
    <Modal title="Racer Options" submit={handleSubmit} close={close}>
      {/* Render Modal component */}
      <div className="flex items-center gap-2">
        {/* Driver select row */}
        <label htmlFor="Driver" className="font-medium uppercase">
          {/* Label for driver select */}
          Driver
        </label>
        <select
          name="Driver" // Name of the select
          value={driver} // Value bound to driver state
          onChange={changeDriver} // On change handler
          className="border border-gray-300 rounded p-1 drop-shadow" // Styling classes
        >
          {DRIVERS.map(
            (
              currentDriver // Map over all drivers
            ) => (
              <option value={currentDriver} key={currentDriver}>
                {/* Option for each driver */}
                {currentDriver}
              </option>
            )
          )}
        </select>
      </div>
      <div className="flex items-center gap-2">
        {" "}
        {/* Team select row */}
        <label htmlFor="Team" className="font-medium uppercase">
          {/* Label for team select */}
          Team
        </label>
        <select
          name="Team" // Name of the select
          value={team} // Value bound to team state
          onChange={changeTeam} // On change handler
          className="border border-gray-300 rounded p-1 drop-shadow" // Styling classes
        >
          {TEAMS.map(
            (
              currentTeam // Map over all teams
            ) => (
              <option value={currentTeam} key={currentTeam}>
                {/* Option for each team */}
                {currentTeam}
              </option>
            )
          )}
        </select>
      </div>
      <div className="flex items-center gap-2">
        {/* Circuit select row */}
        <label htmlFor="Circuit" className="font-medium uppercase">
          {/* Label for circuit select */}
          Circuit
        </label>
        <select
          name="Circuit" // Name of the select
          value={circuit} // Value bound to circuit state
          onChange={changeCircuit} // On change handler
          className="border border-gray-300 rounded p-1 drop-shadow" // Styling classes
        >
          {CIRCUIT_NAMES.map(
            (
              currentCircuit // Map over all circuits
            ) => (
              <option value={currentCircuit} key={currentCircuit}>
                {/* Option for each circuit */}
                {currentCircuit}
              </option>
            )
          )}
        </select>
      </div>
    </Modal>
  );
};

export default RacerModal; // Export RacerModal
