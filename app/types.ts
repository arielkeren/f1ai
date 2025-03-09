import {
  COMPOUNDS,
  DRIVERS,
  LAP_TYPES,
  RAINFALL_OPTIONS,
  TEAMS,
} from "./constants";

export type Compound = (typeof COMPOUNDS)[number];
export type LapType = (typeof LAP_TYPES)[number];
export type Driver = (typeof DRIVERS)[number];
export type Team = (typeof TEAMS)[number];
export type RainfallOption = (typeof RAINFALL_OPTIONS)[number];
export type NumericalWeatherField =
  | "airTemp"
  | "humidity"
  | "pressure"
  | "trackTemp"
  | "windDirection"
  | "windSpeed";

export type Lap = {
  lapType: LapType;
  compound: Compound;
  lapTime: number;
  tireLife: number;
};

export type Weather = {
  rainfall: RainfallOption;
  airTemp: number;
  humidity: number;
  pressure: number;
  trackTemp: number;
  windDirection: number;
  windSpeed: number;
};
