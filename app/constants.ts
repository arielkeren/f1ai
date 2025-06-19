import { Weather } from "./types";

export const PIT_STOP_PENALTY_MS = 22000;

export const COMPOUNDS = ["SOFT", "MEDIUM", "HARD"] as const;

export const TEAMS = [
  "Alfa Romeo",
  "Alfa Romeo Racing",
  "AlphaTauri",
  "Alpine",
  "Aston Martin",
  "Ferrari",
  "Force India",
  "Haas F1 Team",
  "McLaren",
  "Mercedes",
  "Racing Point",
  "Red Bull Racing",
  "Renault",
  "Sauber",
  "Toro Rosso",
  "Williams",
] as const;

export const DRIVERS = [
  "AIT",
  "ALB",
  "ALO",
  "BOT",
  "DEV",
  "ERI",
  "FIT",
  "GAS",
  "GIO",
  "GRO",
  "HAM",
  "HAR",
  "HUL",
  "KUB",
  "KVY",
  "LAT",
  "LAW",
  "LEC",
  "MAG",
  "MAZ",
  "MSC",
  "NOR",
  "OCO",
  "PER",
  "PIA",
  "RAI",
  "RIC",
  "RUS",
  "SAI",
  "SAR",
  "SIR",
  "STR",
  "TSU",
  "VAN",
  "VER",
  "VET",
  "ZHO",
] as const;

export const WEATHER = [
  "airTemp",
  "humidity",
  "pressure",
  "trackTemp",
  "windDirection",
  "windSpeed",
] as const;

export const CIRCUIT_NAMES = [
  "Melbourne Grand Prix Circuit",
  "Shanghai International Circuit",
  "Suzuka",
  "Bahrain International Circuit",
  "Jeddah Street Circuit",
  "Hard Rock Stadium Circuit",
  "Autodromo Internazionale Enzo e Dino Ferrari",
  "Circuit de Monaco",
  "Circuit de Barcelona-Catalunya",
  "Circuit Gilles Villeneuve",
  "Red Bull Ring",
  "Silverstone Circuit",
  "Circuit de Spa-Francorchamps",
  "Hungaroring",
  "Zandvoort",
  "Autodromo Nazionale di Monza",
  "Baku City Circuit",
  "Marina Bay Street Circuit",
  "Circuit of the Americas",
  "Autodromo Hermanos Rodriguez",
  "Autodromo Jose Carlos Pace",
  "Las Vegas Street Circuit",
  "Lusail Circuit",
  "Yas Marina Circuit",
] as const;

export const CIRCUIT_TO_LAPS = {
  "Melbourne Grand Prix Circuit": 58,
  "Shanghai International Circuit": 56,
  Suzuka: 53,
  "Bahrain International Circuit": 57,
  "Jeddah Street Circuit": 50,
  "Hard Rock Stadium Circuit": 57,
  "Autodromo Internazionale Enzo e Dino Ferrari": 63,
  "Circuit de Monaco": 78,
  "Circuit de Barcelona-Catalunya": 66,
  "Circuit Gilles Villeneuve": 70,
  "Red Bull Ring": 71,
  "Silverstone Circuit": 52,
  "Circuit de Spa-Francorchamps": 44,
  Hungaroring: 70,
  Zandvoort: 72,
  "Autodromo Nazionale di Monza": 53,
  "Baku City Circuit": 51,
  "Marina Bay Street Circuit": 61,
  "Circuit of the Americas": 56,
  "Autodromo Hermanos Rodriguez": 71,
  "Autodromo Jose Carlos Pace": 71,
  "Las Vegas Street Circuit": 50,
  "Lusail Circuit": 57,
  "Yas Marina Circuit": 55,
};

export const CIRCUIT_TO_DISTANCE = {
  "Melbourne Grand Prix Circuit": 5.278,
  "Shanghai International Circuit": 5.451,
  Suzuka: 5.807,
  "Bahrain International Circuit": 5.412,
  "Jeddah Street Circuit": 6.174,
  "Hard Rock Stadium Circuit": 5.412,
  "Autodromo Internazionale Enzo e Dino Ferrari": 4.909,
  "Circuit de Monaco": 3.337,
  "Circuit de Barcelona-Catalunya": 4.657,
  "Circuit Gilles Villeneuve": 4.361,
  "Red Bull Ring": 4.318,
  "Silverstone Circuit": 5.891,
  "Circuit de Spa-Francorchamps": 7.004,
  Hungaroring: 4.381,
  Zandvoort: 4.259,
  "Autodromo Nazionale di Monza": 5.793,
  "Baku City Circuit": 6.003,
  "Marina Bay Street Circuit": 4.94,
  "Circuit of the Americas": 5.513,
  "Autodromo Hermanos Rodriguez": 4.304,
  "Autodromo Jose Carlos Pace": 4.309,
  "Las Vegas Street Circuit": 6.201,
  "Lusail Circuit": 5.419,
  "Yas Marina Circuit": 5.281,
};

export const CIRCUIT_TO_MAX_STINTS = {
  "Circuit of the Americas": { hard: 43, medium: 31, soft: 20 },
  "Autodromo Jose Carlos Pace": { hard: 37, medium: 28, soft: 18 },
  "Autodromo Internazionale Enzo e Dino Ferrari": {
    hard: 60,
    medium: 28,
    soft: 15,
  },
  "Circuit de Monaco": { hard: 78, medium: 59, soft: 38 },
  "Circuit Gilles Villeneuve": { hard: 40, medium: 30, soft: 20 },
  "Autodromo Hermanos Rodriguez": { hard: 50, medium: 37, soft: 23 },
  "Silverstone Circuit": { hard: 42, medium: 30, soft: 19 },
  Hungaroring: { hard: 50, medium: 36, soft: 24 },
  "Circuit de Spa-Francorchamps": { hard: 16, medium: 11, soft: 7 },
  "Autodromo Nazionale di Monza": { hard: 41, medium: 30, soft: 19 },
  "Circuit de Barcelona-Catalunya": { hard: 49, medium: 36, soft: 23 },
  Suzuka: { hard: 21, medium: 15, soft: 10 },
  "Melbourne Grand Prix Circuit": { hard: 73, medium: 54, soft: 34 },
  "Shanghai International Circuit": { hard: 42, medium: 32, soft: 22 },
  "Bahrain International Circuit": { hard: 45, medium: 35, soft: 25 },
  "Jeddah Street Circuit": { hard: 43, medium: 33, soft: 23 },
  "Hard Rock Stadium Circuit": { hard: 41, medium: 31, soft: 21 },
  "Red Bull Ring": { hard: 42, medium: 32, soft: 22 },
  Zandvoort: { hard: 40, medium: 30, soft: 20 },
  "Baku City Circuit": { hard: 43, medium: 33, soft: 23 },
  "Marina Bay Street Circuit": { hard: 38, medium: 28, soft: 18 },
  "Las Vegas Street Circuit": { hard: 41, medium: 31, soft: 21 },
  "Lusail Circuit": { hard: 18, medium: 18, soft: 18 },
  "Yas Marina Circuit": { hard: 42, medium: 32, soft: 22 },
};

export const MEAN = {
  tireLife: 15.635992572027432,
  airTemp: 24.1037838533527,
  humidity: 50.84158561473827,
  pressure: 982.8752220118039,
  trackTemp: 36.54717589953851,
  windDirection: 161.8715089448234,
  windSpeed: 1.663187409218776,
  lapTime: 90978.02899483351,
};

export const STD = {
  tireLife: 10.492291770587913,
  airTemp: 4.6009497449197765,
  humidity: 16.101572150210814,
  pressure: 52.979258462740304,
  trackTemp: 8.813006951130712,
  windDirection: 100.04619743542736,
  windSpeed: 1.1737432126844445,
  lapTime: 14317.711536857258,
};

export const MIN = {
  lapTime: 55808,
  airTemp: 8.9,
  humidity: 5,
  pressure: 778.5,
  trackTemp: 13.9,
  windDirection: 0,
  windSpeed: 0,
};

export const MAX = {
  lapTime: 150970,
  airTemp: 37.2,
  humidity: 89,
  pressure: 1023.3,
  trackTemp: 57.5,
  windDirection: 359,
  windSpeed: 8.6,
};

export const STARTING_WEATHER: Weather = {
  airTemp: 23.71641746992163,
  humidity: 52.11558948946384,
  pressure: 983.7748390253755,
  trackTemp: 35.58323067721967,
  windDirection: 163.08201356148103,
  windSpeed: 1.6702765889690634,
};

export const KG_FUEL_PER_KM = 0.36;

export const STARTING_FUEL = 110;

export const SECONDS_PER_KG_FUEL = 0.035;

export const TIRE_WEAR = {
  SOFT: 0.77469,
  MEDIUM: 0.50938,
  HARD: 0.39127,
};
