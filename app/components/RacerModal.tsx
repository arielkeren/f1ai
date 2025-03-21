import { useState } from "react";
import { Compound, Driver, Team } from "../types";
import { COMPOUNDS, DRIVERS, TEAMS } from "../constants";
import Modal from "./Modal";

type Props = {
  selectedDriver: Driver;
  selectedTeam: Team;
  selectedInitialCompound: Compound;
  changeRacer: (driver: Driver, team: Team, initialCompound: Compound) => void;
  close: () => void;
};

const RacerModal: React.FC<Props> = ({
  selectedDriver,
  selectedTeam,
  selectedInitialCompound,
  changeRacer,
  close,
}) => {
  const [driver, setDriver] = useState<Driver>(selectedDriver);
  const [team, setTeam] = useState<Team>(selectedTeam);
  const [initialCompound, setInitialCompound] = useState<Compound>(
    selectedInitialCompound
  );

  const changeDriver = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDriver(event.target.value as Driver);

  const changeTeam = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setTeam(event.target.value as Team);

  const changeInitialCompound = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setInitialCompound(event.target.value as Compound);

  const handleSubmit = () => {
    changeRacer(driver, team, initialCompound);
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
    </Modal>
  );
};

export default RacerModal;
