import { NUMERICAL_FIELDS } from "./constants";
import { Lap, LapField, LapStrings } from "./types";

const isPositiveDecimal = (str: string) => {
  const num = parseFloat(str);
  return !isNaN(num) && isFinite(num) && num >= 0 && /^\d*\.?\d+$/.test(str);
};

export const fieldToName = (field: LapField) => {
  switch (field) {
    case "airTemp":
      return "Air Temp";
    case "compound":
      return "Compound";
    case "humidity":
      return "Humidity";
    case "lapTime":
      return "Lap Time";
    case "lapType":
      return "Lap Type";
    case "position":
      return "Position";
    case "pressure":
      return "Pressure";
    case "rainfall":
      return "Rainfall";
    case "stint":
      return "Stint";
    case "tireLife":
      return "Tire Life";
    case "trackStatus":
      return "Track Status";
    case "trackTemp":
      return "Track Temp";
    case "windDirection":
      return "Wind Direction";
    case "windSpeed":
      return "Wind Speed";
  }
};

export const convertToLap = (lap: LapStrings) => {
  for (const field of NUMERICAL_FIELDS)
    if (!isPositiveDecimal(lap[field])) return null;

  return {
    compound: lap.compound,
    lapType: lap.lapType,
    rainfall: lap.rainfall,
    lapTime: parseFloat(lap.lapTime),
    stint: parseFloat(lap.stint),
    tireLife: parseFloat(lap.tireLife),
    trackStatus: parseFloat(lap.trackStatus),
    position: parseFloat(lap.position),
    airTemp: parseFloat(lap.airTemp),
    humidity: parseFloat(lap.humidity),
    pressure: parseFloat(lap.pressure),
    trackTemp: parseFloat(lap.trackTemp),
    windDirection: parseFloat(lap.windDirection),
    windSpeed: parseFloat(lap.windSpeed),
  } as Lap;
};
