"use client";

import { useState } from "react";
import { DRIVERS, TEAMS } from "./constants";
import LapCard from "./components/LapCard";
import AddLapCard from "./components/AddLapCard";

const Home: React.FC = () => {
  const [driver, setDriver] = useState("GAS");
  const [team, setTeam] = useState("Red Bull Racing");
  const [laps, setLaps] = useState<Lap[]>([]);

  const changeDriver = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDriver(event.target.value);

  const changeTeam = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setTeam(event.target.value);

  const addLap = (lap: Lap) => setLaps([...laps, lap]);

  return (
    <div>
      <div>
        <select value={driver} onChange={changeDriver}>
          {DRIVERS.map(currentDriver => (
            <option value={currentDriver} key={currentDriver}>
              {currentDriver}
            </option>
          ))}
        </select>
        <select value={team} onChange={changeTeam}>
          {TEAMS.map(currentTeam => (
            <option value={currentTeam} key={currentTeam}>
              {currentTeam}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {laps.map((lap, index) => (
          <LapCard lap={lap} lapNumber={index + 1} key={lap.lapTime} />
        ))}
        <AddLapCard addLap={addLap} />
      </div>
    </div>
  );
};

export default Home;
