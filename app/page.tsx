"use client";

import { useState } from "react";
import { Compound, Driver, Lap, Team, Weather } from "./types";
import Header from "./components/Header";
import InitialLaps from "./components/InitialLaps";
import { BsStars } from "react-icons/bs";
import useModel from "./hooks/useModel";
import { COMPOUNDS, DRIVERS, STARTING_WEATHER, TEAMS } from "./constants";

const Home: React.FC = () => {
  const [laps, setLaps] = useState<(Lap | null)[]>([null, null, null]);
  const [driver, setDriver] = useState<Driver>(DRIVERS[0]);
  const [team, setTeam] = useState<Team>(TEAMS[0]);
  const [initialCompound, setInitialCompound] = useState<Compound>(
    COMPOUNDS[0]
  );
  const [weather, setWeather] = useState<Weather>(STARTING_WEATHER);

  const runModel = useModel();

  const changeWeather = (newWeather: Weather) => setWeather(newWeather);

  const changeRacer = (
    driver: Driver,
    team: Team,
    initialCompound: Compound
  ) => {
    setDriver(driver);
    setTeam(team);
    setInitialCompound(initialCompound);
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
        weather={weather}
        driver={driver}
        team={team}
        initialCompound={initialCompound}
        changeWeather={changeWeather}
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
