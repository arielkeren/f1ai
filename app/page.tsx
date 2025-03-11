"use client";

import { useState } from "react";
import { Compound, Driver, Team, Weather } from "./types";
import Header from "./components/Header";
import InitialLaps from "./components/InitialLaps";
import useModel from "./hooks/useModel";
import { COMPOUNDS, DRIVERS, STARTING_WEATHER, TEAMS } from "./constants";
import StartGeneratingButton from "./components/StartGeneratingButton";
import Strategy from "./components/Strategy";

const Home: React.FC = () => {
  const [initialLapTimes, setInitialLapTimes] = useState<number[]>([0, 0, 0]);
  const [driver, setDriver] = useState<Driver>(DRIVERS[0]);
  const [team, setTeam] = useState<Team>(TEAMS[0]);
  const [initialCompound, setInitialCompound] = useState<Compound>(
    COMPOUNDS[0]
  );
  const [weather, setWeather] = useState<Weather>(STARTING_WEATHER);
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState<(number[] | Compound)[]>([]);

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

  const changeLap = (lapTime: number, lapNumber: number) => {
    const newLaps = [...initialLapTimes];
    newLaps[lapNumber - 1] = lapTime;
    setInitialLapTimes(newLaps);
  };

  const startGenerating = async () => {
    if (initialLapTimes.some(lapTime => lapTime === 0)) return;

    setIsGenerating(true);
    setStrategy([]);

    const pitStop = Math.floor(Math.random() * 8) + 2;
    const currentLapTimes = [...initialLapTimes];
    const currentCompounds = [
      initialCompound,
      initialCompound,
      initialCompound,
    ];
    const currentTireLife = [1, 2, 3];
    let chosenCompound = initialCompound;
    let updatedTireLife = 4;

    for (let i = 0; i < 47; i++) {
      const prediction = await runModel(
        currentLapTimes,
        driver,
        team,
        currentCompounds,
        weather,
        currentTireLife,
        i % 10 === pitStop - 1 ? "Inlap" : i % 10 === pitStop ? "Outlap" : "Lap"
      );

      if (i % 10 === pitStop) {
        chosenCompound =
          COMPOUNDS[Math.floor(Math.random() * COMPOUNDS.length)];
        updatedTireLife = 1;
        setStrategy(prevStrategy => [
          ...prevStrategy,
          chosenCompound,
          [prediction, i + 4],
        ]);
      } else
        setStrategy(prevStrategy => [...prevStrategy, [prediction, i + 4]]);

      currentLapTimes.push(prediction);
      currentLapTimes.shift();

      currentCompounds.push(chosenCompound);
      currentCompounds.shift();

      currentTireLife.push(updatedTireLife);
      currentTireLife.shift();

      updatedTireLife++;
    }

    setIsGenerating(false);
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
      <InitialLaps lapTimes={initialLapTimes} changeLap={changeLap} />
      <hr className="border border-gray-200" />
      <StartGeneratingButton
        isGenerating={isGenerating}
        startGenerating={startGenerating}
      />
      <Strategy strategy={strategy} />
    </>
  );
};

export default Home;
