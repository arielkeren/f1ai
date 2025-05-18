import { COMPOUNDS, DRIVERS, TEAMS, CIRCUIT_NAMES } from "./constants";

export type Compound = (typeof COMPOUNDS)[number];
export type Driver = (typeof DRIVERS)[number];
export type Team = (typeof TEAMS)[number];
export type Circuit = (typeof CIRCUIT_NAMES)[number];
export type NumericalWeatherField =
  | "airTemp"
  | "humidity"
  | "pressure"
  | "trackTemp"
  | "windDirection"
  | "windSpeed";

export type Weather = {
  airTemp: number;
  humidity: number;
  pressure: number;
  trackTemp: number;
  windDirection: number;
  windSpeed: number;
};
