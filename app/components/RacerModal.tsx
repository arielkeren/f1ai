import { useState } from "react";
import { Compound, Driver, Team, Circuit } from "../types";
import { COMPOUNDS, DRIVERS, TEAMS, CIRCUIT_NAMES } from "../constants";
import Modal from "./Modal";

type Props = {
  selectedDriver: Driver;
  selectedTeam: Team;
  selectedInitialCompound: Compound;
  selectedCircuit: Circuit;
  changeRacer: (
    driver: Driver,
    team: Team,
    initialCompound: Compound,
    circuit: Circuit
  ) => void;
  close: () => void;
};

const RacerModal: React.FC<Props> = ({
  selectedDriver,
  selectedTeam,
  selectedInitialCompound,
  selectedCircuit,
  changeRacer,
  close,
}) => {
  const [driver, setDriver] = useState<Driver>(selectedDriver);
  const [team, setTeam] = useState<Team>(selectedTeam);
  const [initialCompound, setInitialCompound] = useState<Compound>(
    selectedInitialCompound
  );
  const [circuit, setCircuit] = useState<Circuit>(selectedCircuit);

  const changeDriver = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDriver(event.target.value as Driver);

  const changeTeam = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setTeam(event.target.value as Team);

  const changeInitialCompound = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setInitialCompound(event.target.value as Compound);

  const changeCircuit = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCircuit(event.target.value as Circuit);

  const handleSubmit = () => {
    changeRacer(driver, team, initialCompound, circuit);
    close();
  };

  return (
    <Modal title="Racer Options" submit={handleSubmit} close={close}>
      <div className="flex items-center gap-2">
        <label htmlFor="Driver" className="font-medium uppercase">
          Driver
        </label>
        <select
          name="Driver"
          value={driver}
          onChange={changeDriver}
          className="border border-gray-300 rounded p-1 drop-shadow"
        >
          {DRIVERS.map(currentDriver => (
            <option value={currentDriver} key={currentDriver}>
              {currentDriver}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="Team" className="font-medium uppercase">
          Team
        </label>
        <select
          name="Team"
          value={team}
          onChange={changeTeam}
          className="border border-gray-300 rounded p-1 drop-shadow"
        >
          {TEAMS.map(currentTeam => (
            <option value={currentTeam} key={currentTeam}>
              {currentTeam}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="Initial Compound" className="font-medium uppercase">
          Initial Tire Compound
        </label>
        <select
          name="Initial Compound"
          value={initialCompound}
          onChange={changeInitialCompound}
          className="border border-gray-300 rounded p-1 drop-shadow"
        >
          {COMPOUNDS.map(currentCompound => (
            <option value={currentCompound} key={currentCompound}>
              {currentCompound}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="Circuit" className="font-medium uppercase">
          Circuit
        </label>
        <select
          name="Circuit"
          value={circuit}
          onChange={changeCircuit}
          className="border border-gray-300 rounded p-1 drop-shadow"
        >
          {CIRCUIT_NAMES.map(currentCircuit => (
            <option value={currentCircuit} key={currentCircuit}>
              {currentCircuit}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
};

export default RacerModal;
