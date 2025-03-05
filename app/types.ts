import { COMPOUNDS, LAP_TYPES, RAINFALL_OPTIONS } from "./constants";

type Compound = (typeof COMPOUNDS)[number];
type LapType = (typeof LAP_TYPES)[number];
type RainfallOption = (typeof RAINFALL_OPTIONS)[number];

export type Lap = {
  lapType: LapType;
  compound: Compound;
  lapTime: number;
  tireLife: number;
};

type Weather = {
  airTemp: number;
  humidity: number;
  pressure: number;
  rainfall: RainfallOption;
  trackTemp: number;
  windDirection: number;
  windSpeed: number;
};
