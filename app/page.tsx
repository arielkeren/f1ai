"use client";

import { useState } from "react";
import LapCard from "./components/LapCard";
import AddLapCard from "./components/AddLapCard";
import { Driver, Lap, Team } from "./types";
import Header from "./components/Header";

const Home: React.FC = () => {
  const [driver, setDriver] = useState<Driver>("GAS");
  const [team, setTeam] = useState<Team>("Red Bull Racing");
  const [laps, setLaps] = useState<Lap[]>([]);

  const changeRacer = (driver: Driver, team: Team) => {
    setDriver(driver);
    setTeam(team);
  };

  const addLap = (lap: Lap) => setLaps([...laps, lap]);

  return (
    <>
      <Header
        selectedDriver={driver}
        selectedTeam={team}
        changeRacer={changeRacer}
      />
      <div className="grid grid-cols-3 gap-4 p-5">
        {laps.map((lap, index) => (
          <LapCard lap={lap} lapNumber={index + 1} key={lap.lapTime} />
        ))}
        <AddLapCard addLap={addLap} />
      </div>
    </>
  );
};

export default Home;
