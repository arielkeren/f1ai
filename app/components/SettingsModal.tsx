import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Driver, Team } from "../types";
import { DRIVERS, TEAMS } from "../constants";
import { ImArrowUp } from "react-icons/im";

type Props = {
  selectedDriver: Driver;
  selectedTeam: Team;
  changeRacer: (driver: Driver, team: Team) => void;
  close: () => void;
};

const AddLapModal: React.FC<Props> = ({
  selectedDriver,
  selectedTeam,
  changeRacer,
  close,
}) => {
  const [driver, setDriver] = useState<Driver>(selectedDriver);
  const [team, setTeam] = useState<Team>(selectedTeam);

  const changeDriver = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDriver(event.target.value as Driver);

  const changeTeam = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setTeam(event.target.value as Team);

  const handleSubmit = () => {
    changeRacer(driver, team);
    close();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-brightness-75 z-10">
      <div className="relative flex flex-col gap-10 items-center bg-white p-5 rounded drop-shadow h-1/2 w-1/2">
        <button onClick={close} className="absolute top-5 right-5">
          <IoClose className="text-3xl" />
        </button>

        <h2 className="text-center font-bold uppercase text-4xl">Settings</h2>

        <div className="flex flex-col gap-2">
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
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-1 bg-gray-900 text-white px-20 py-3 uppercase rounded transition-colors hover:bg-gray-800"
        >
          <ImArrowUp />
          Apply
        </button>
      </div>
    </div>
  );
};

export default AddLapModal;
