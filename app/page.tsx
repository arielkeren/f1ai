"use client";

import { useState } from "react";
import { Driver, Lap, Team, Weather } from "./types";
import Header from "./components/Header";
import InitialLaps from "./components/InitialLaps";
import { BsStars } from "react-icons/bs";
import useModel from "./hooks/useModel";

const Home: React.FC = () => {
  const [laps, setLaps] = useState<(Lap | null)[]>([null, null, null]);
  const [driver, setDriver] = useState<Driver>("AIT");
  const [team, setTeam] = useState<Team>("Alfa Romeo");
  const [weather, setWeather] = useState<Weather>({
    rainfall: "No Rain",
    airTemp: 23.71641746992163,
    humidity: 52.11558948946384,
    pressure: 983.7748390253755,
    trackTemp: 35.58323067721967,
    windDirection: 163.08201356148103,
    windSpeed: 1.6702765889690634,
  });

  const runModel = useModel();

  const changeRacer = (driver: Driver, team: Team) => {
    setDriver(driver);
    setTeam(team);
  };

  const changeLap = (lap: Lap, lapNumber: number) => {
    const newLaps = [...laps];
    newLaps[lapNumber - 1] = lap;
    setLaps(newLaps);
  };

  const startGenerating = () => {
    if (laps.some(lap => lap === null)) return;

    runModel(laps as Lap[], weather, driver, team);
  };

  return (
    <>
      <Header
        selectedDriver={driver}
        selectedTeam={team}
        changeRacer={changeRacer}
      />
      <InitialLaps laps={laps} changeLap={changeLap} />
      <hr className="border border-gray-200" />
      <div className="flex justify-center mt-10">
        <button
          onClick={startGenerating}
          className="flex items-center gap-1 text-xl font-medium bg-gray-900 text-white px-20 py-5 uppercase rounded transition-colors hover:bg-gray-800"
        >
          <BsStars />
          Start Generating
        </button>
      </div>
    </>
  );
};

export default Home;
