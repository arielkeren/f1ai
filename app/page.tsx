"use client";

import { useState } from "react";
import { Compound, Driver, Team, Weather, Circuit } from "./types";
import Header from "./components/Header";
import InitialLaps from "./components/InitialLaps";
import useModel from "./hooks/useModel";
import {
  COMPOUNDS,
  DRIVERS,
  STARTING_WEATHER,
  TEAMS,
  CIRCUIT_TO_LAPS,
  RAINFALL_COMPOUNDS,
  NO_RAINFALL_COMPOUNDS,
  CIRCUIT_NAMES,
  ONE_STOP_PIT_STOPS,
  TIRE_WEAR,
  STARTING_FUEL,
  CIRCUIT_TO_DISTANCE,
  KG_FUEL_PER_KM,
  SECONDS_PER_KG_FUEL,
} from "./constants";
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
  const [oneStopStrategy, setOneStopStrategy] = useState<
    (number[] | Compound)[]
  >([]);
  const [twoStopStrategy, setTwoStopStrategy] = useState<
    (number[] | Compound)[]
  >([]);
  const [circuit, setCircuit] = useState<Circuit>(CIRCUIT_NAMES[0]);

  const runModel = useModel();

  const changeWeather = (newWeather: Weather) => setWeather(newWeather);

  const changeRacer = (
    driver: Driver,
    team: Team,
    initialCompound: Compound,
    circuit: Circuit
  ) => {
    setDriver(driver);
    setTeam(team);
    setInitialCompound(initialCompound);
    setCircuit(circuit);
  };

  const changeLap = (lapTime: number, lapNumber: number) => {
    const newLaps = [...initialLapTimes];
    newLaps[lapNumber - 1] = lapTime;
    setInitialLapTimes(newLaps);
  };

  const generateOneStopStrategy = async () => {
    let bestStrategyTime = Infinity;

    for (const pitStop of ONE_STOP_PIT_STOPS)
      for (const compound of weather.rainfall === "Rainy"
        ? RAINFALL_COMPOUNDS
        : NO_RAINFALL_COMPOUNDS) {
        let currentStrategyTime = 0;
        const currentLapTimes = [...initialLapTimes];
        const currentCompounds = [
          initialCompound,
          initialCompound,
          initialCompound,
        ];
        const currentTireLife = [1, 2, 3];
        let updatedTireLife = 4;
        const currentStrategy: (number[] | Compound)[] = [];

        for (let i = 4; i < CIRCUIT_TO_LAPS[circuit] + 1; i++) {
          let prediction = await runModel(
            currentLapTimes,
            driver,
            team,
            currentCompounds,
            weather,
            currentTireLife,
            i === pitStop - 1 ? "Inlap" : i === pitStop ? "Outlap" : "Lap"
          );

          currentStrategyTime += prediction;

          if (i === pitStop) {
            updatedTireLife = 1;
            currentStrategy.push(compound);
          }
          currentStrategy.push([prediction, i]);

          currentLapTimes.push(prediction);
          currentLapTimes.shift();

          currentCompounds.push(compound);
          currentCompounds.shift();

          currentTireLife.push(updatedTireLife);
          currentTireLife.shift();

          updatedTireLife++;
        }

        if (bestStrategyTime > currentStrategyTime) {
          bestStrategyTime = currentStrategyTime;
          setOneStopStrategy(currentStrategy);
        }
      }
  };

  const generateTwoStopStrategy = async () => {
    return;
    const pitStops = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    let bestStrategyTime = 12000000;
    let currentStrategyTime = 0;
    let bestStrategy: (number[] | Compound)[] = [];
    const currentLapTimes = [...initialLapTimes];
    const currentCompounds = [
      initialCompound,
      initialCompound,
      initialCompound,
    ];
    const currentTireLife = [1, 2, 3];
    let updatedTireLife = 4;

    for (const pitStop of pitStops)
      for (const compound of weather.rainfall === "Rainy"
        ? RAINFALL_COMPOUNDS
        : NO_RAINFALL_COMPOUNDS) {
        for (let i = 4; i < CIRCUIT_TO_LAPS[circuit] + 1; i++) {
          const prediction = await runModel(
            currentLapTimes,
            driver,
            team,
            currentCompounds,
            weather,
            currentTireLife,
            i === pitStop - 1 ? "Inlap" : i === pitStop ? "Outlap" : "Lap"
          );

          currentStrategyTime += prediction;

          if (i === pitStop) {
            updatedTireLife = 1;
            setOneStopStrategy((prevStrategy) => [
              ...prevStrategy,
              compound,
              [prediction, i],
            ]);
          } else
            setOneStopStrategy((prevStrategy) => [
              ...prevStrategy,
              [prediction, i],
            ]);

          currentLapTimes.push(prediction);
          currentLapTimes.shift();

          currentCompounds.push(compound);
          currentCompounds.shift();

          currentTireLife.push(updatedTireLife);
          currentTireLife.shift();

          updatedTireLife++;
        }

        if (bestStrategyTime > currentStrategyTime) {
          bestStrategyTime = currentStrategyTime;
          setOneStopStrategy((prevStrategy) => {
            bestStrategy = prevStrategy;
            return [];
          });
        }

        setOneStopStrategy([]);
      }

    setOneStopStrategy(bestStrategy);
  };

  const startGenerating = async () => {
    if (initialLapTimes.some((lapTime) => lapTime === 0)) return;

    setIsGenerating(true);
    setOneStopStrategy([]);
    setTwoStopStrategy([]);

    await generateOneStopStrategy();
    await generateTwoStopStrategy();

    setIsGenerating(false);
  };

  return (
    <>
      <Header
        weather={weather}
        driver={driver}
        team={team}
        initialCompound={initialCompound}
        circuit={circuit}
        changeWeather={changeWeather}
        changeRacer={changeRacer}
      />
      <InitialLaps lapTimes={initialLapTimes} changeLap={changeLap} />
      <hr className="border border-gray-200" />
      <StartGeneratingButton
        isGenerating={isGenerating}
        startGenerating={startGenerating}
      />
      <Strategy strategy={oneStopStrategy} />
    </>
  );
};

export default Home;
