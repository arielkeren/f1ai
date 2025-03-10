import { useEffect, useState } from "react";
import { loadLayersModel, LayersModel, tensor } from "@tensorflow/tfjs";
import { Compound, Driver, Lap, Team, Weather } from "../types";
import {
  COMPOUNDS,
  DRIVERS,
  LAP_TYPES,
  MEAN,
  NUMERICAL_WEATHER,
  STD,
  TEAMS,
} from "../constants";
import { encode, standardize } from "../utils";

const useModel = () => {
  const [model, setModel] = useState<LayersModel | null>(null);

  useEffect(() => {
    const loadModel = async () =>
      setModel(await loadLayersModel("/model/model.json"));

    loadModel();
  }, []);

  const preprocessWeather = (weather: Weather) => {
    const processedWeather = [];

    NUMERICAL_WEATHER.forEach(field =>
      processedWeather.push(
        standardize(weather[field], MEAN[field], STD[field])
      )
    );

    processedWeather.push(1 ? weather.rainfall === "Rainy" : 0);

    return processedWeather;
  };

  const preprocess = (
    lapTime: number,
    tireLife: number,
    driver: Driver,
    team: Team,
    initialCompound: Compound,
    weather: Weather
  ) => {
    const array = [];

    array.push(standardize(lapTime, MEAN.lapTime, STD.lapTime));
    array.push(standardize(tireLife, MEAN.tireLife, STD.tireLife));

    array.push(...preprocessWeather(weather));

    array.push(...encode("Lap", LAP_TYPES));
    array.push(...encode(initialCompound, COMPOUNDS));

    array.push(...encode(driver, DRIVERS));
    array.push(...encode(team, TEAMS));

    return array;
  };

  const makePrediction = async (processedArray: number[][]) => {
    if (!model) return null;

    const processedTensor = tensor(processedArray).reshape([1, 3, 73]);
    const prediction = await (model.predict(processedTensor) as any).array();

    return prediction[0][2][0];
  };

  const runModel = async (
    lapTimes: number[],
    driver: Driver,
    team: Team,
    initialCompound: Compound,
    weather: Weather
  ) => {
    if (!model || lapTimes.length !== 3) return null;

    const processedArray = lapTimes.map((lapTime, index) =>
      preprocess(lapTime, index + 1, driver, team, initialCompound, weather)
    );

    return await makePrediction(processedArray);
  };

  return runModel;
};

export default useModel;
