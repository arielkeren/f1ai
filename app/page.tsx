"use client";

import { useState } from "react";
import LapCard from "./components/LapCard";
import { Driver, Lap, Team } from "./types";
import Header from "./components/Header";

const Home: React.FC = () => {
  const [driver, setDriver] = useState<Driver>("GAS");
  const [team, setTeam] = useState<Team>("Red Bull Racing");
  const [laps, setLaps] = useState<(Lap | null)[]>([null, null, null]);

  const changeRacer = (driver: Driver, team: Team) => {
    setDriver(driver);
    setTeam(team);
  };

  const changeLap = (lap: Lap, lapNumber: number) => {
    const newLaps = [...laps];
    newLaps[lapNumber - 1] = lap;
    setLaps(newLaps);
  };

  return (
    <>
      <Header
        selectedDriver={driver}
        selectedTeam={team}
        changeRacer={changeRacer}
      />
      <div className="grid grid-cols-3 gap-4 p-5">
        {laps.map((lap, index) => (
          <LapCard
            lap={lap}
            lapNumber={index + 1}
            changeLap={changeLap}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
