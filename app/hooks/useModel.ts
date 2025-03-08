import { useEffect, useState } from "react";
import { loadLayersModel, LayersModel, tensor } from "@tensorflow/tfjs";
import { Driver, Lap, Team, Weather } from "../types";
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

  const preprocessNumericalLap = (lap: Lap) => {
    const processedLap = [];

    processedLap.push(standardize(lap.lapTime, MEAN.lapTime, STD.lapTime));
    processedLap.push(standardize(lap.tireLife, MEAN.tireLife, STD.tireLife));

    return processedLap;
  };

  const preprocessCategoricalLap = (lap: Lap) =>
    encode(lap.lapType, LAP_TYPES).concat(encode(lap.compound, COMPOUNDS));

  const preprocessRacer = (driver: Driver, team: Team) =>
    encode(driver, DRIVERS).concat(encode(team, TEAMS));

  const preprocess = (
    lap: Lap,
    weather: Weather,
    driver: Driver,
    team: Team
  ) => {
    const processed = [];

    processed.push(...preprocessNumericalLap(lap));
    processed.push(...preprocessWeather(weather));
    processed.push(...preprocessCategoricalLap(lap));
    processed.push(...preprocessRacer(driver, team));

    return processed;
  };

  const runModel = async (
    laps: Lap[],
    weather: Weather,
    driver: Driver,
    team: Team
  ) => {
    if (!model || laps.length !== 3) return null;

    const processedArray = laps.map(lap =>
      preprocess(lap, weather, driver, team)
    );

    const processedTensor = tensor(processedArray).reshape([1, 3, 73]);

    const prediction = await (model.predict(processedTensor) as any).array();

    return prediction[0][2][0];
  };

  return runModel;
};

export default useModel;
