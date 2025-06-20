import { NumericalWeatherField } from "./types";

export const formatLapTime = (ms: number) => {
  ms = Math.round(ms);
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
};

export const formatRaceTime = (ms: number) => {
  ms = Math.round(ms);
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};

export const standardize = (value: number, mean: number, std: number) =>
  (value - mean) / std;

export const encode = (value: string, values: readonly string[]) => {
  const encoded = Array(values.length).fill(0);
  encoded[values.indexOf(value)] = 1;

  return encoded;
};

export const weatherFieldToName = (field: NumericalWeatherField) => {
  switch (field) {
    case "airTemp":
      return "Air Temperature";
    case "humidity":
      return "Humidity";
    case "pressure":
      return "Pressure";
    case "trackTemp":
      return "Track Temperature";
    case "windDirection":
      return "Wind Direction";
    case "windSpeed":
      return "Wind Speed";
  }
};
