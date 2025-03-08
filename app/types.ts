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
type RainfallOption = (typeof RAINFALL_OPTIONS)[number];

export type Lap = {
  lapType: LapType;
  compound: Compound;
  lapTime: number;
  tireLife: number;
};

export type Weather = {
  airTemp: number;
  humidity: number;
  pressure: number;
  rainfall: RainfallOption;
  trackTemp: number;
  windDirection: number;
  windSpeed: number;
};
