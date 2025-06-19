import { useEffect, useState } from "react"; // Import React hooks
import { loadLayersModel, LayersModel, tensor } from "@tensorflow/tfjs"; // Import TensorFlow.js functions and types
import { Compound, Driver, Team, Weather } from "../types"; // Import type definitions
import {
  COMPOUNDS, // Array of all compounds
  DRIVERS, // Array of all drivers
  MAX, // Max values for normalization
  MEAN, // Mean values for normalization
  MIN, // Min values for normalization
  WEATHER, // Array of weather fields
  STD, // Standard deviation values for normalization
  TEAMS, // Array of all teams
} from "../constants";
import { encode, standardize } from "../utils"; // Import utility functions

const useModel = () => {
  // Custom React hook for loading and running the model
  const [model, setModel] = useState<LayersModel | null>(null); // State to store the loaded model

  useEffect(() => {
    // Effect to load the model on mount
    const loadModel = async () =>
      setModel(await loadLayersModel("/model/model.json")); // Load model from URL and set state

    loadModel(); // Call the async loader
  }, []); // Run only once on mount

  const preprocessWeather = (weather: Weather) => {
    // Preprocess weather fields
    const processedWeather: number[] = []; // Array to hold processed weather

    WEATHER.forEach(field =>
      processedWeather.push(
        standardize(weather[field], MEAN[field], STD[field]) // Standardize each weather field
      )
    );

    return processedWeather; // Return processed weather array
  };

  const preprocess = (
    lapTime: number, // Lap time value
    tireLife: number, // Tire life value
    driver: Driver, // Driver identifier
    team: Team, // Team identifier
    compound: Compound, // Compound identifier
    weather: Weather // Weather object
  ) => {
    const array = []; // Array to hold all processed features

    array.push(standardize(lapTime, MEAN.lapTime, STD.lapTime)); // Standardize lap time
    array.push(standardize(tireLife, MEAN.tireLife, STD.tireLife)); // Standardize tire life

    array.push(...preprocessWeather(weather)); // Add processed weather features

    array.push(...encode(compound, COMPOUNDS)); // One-hot encode compound
    array.push(...encode(driver, DRIVERS)); // One-hot encode driver
    array.push(...encode(team, TEAMS)); // One-hot encode team

    return array; // Return processed feature array
  };

  const makePrediction = async (processedArray: number[][]) => {
    // Run the model prediction
    if (!model) return null; // Return null if model not loaded

    const processedTensor = tensor(processedArray).reshape([1, 3, 64]); // Convert input to tensor and reshape
    const prediction = await (model.predict(processedTensor) as any).array(); // Run prediction and get result array

    return prediction[0][0]; // Return the predicted value
  };

  const runModel = async (
    lapTimes: number[], // Array of lap times
    tireLife: number[], // Array of tire life values
    compound: Compound, // Compound identifier
    driver: Driver, // Driver identifier
    team: Team, // Team identifier
    weather: Weather // Weather object
  ) => {
    if (!model || lapTimes.length !== 3) return null; // Require model and 3 lap times

    const processedArray = lapTimes.map((lapTime, index) =>
      preprocess(
        Math.max(Math.min(lapTime, MAX.lapTime), MIN.lapTime), // Clamp lap time to min/max
        tireLife[index], // Tire life for this lap
        driver, // Driver
        team, // Team
        compound, // Compound
        weather // Weather
      )
    );

    return await makePrediction(processedArray); // Run prediction and return result
  };

  return runModel; // Return the runModel function from the hook
};

export default useModel; // Export the custom hook
