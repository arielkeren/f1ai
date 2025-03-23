import { Weather } from "./types";

export const COMPOUNDS = [
  "HARD",
  "HYPERSOFT",
  "INTERMEDIATE",
  "MEDIUM",
  "SOFT",
  "SUPERSOFT",
  "ULTRASOFT",
  "WET",
] as const;

export const NO_RAINFALL_COMPOUNDS = [
  "HARD",
  "HYPERSOFT",
  "MEDIUM",
  "SOFT",
  "SUPERSOFT",
  "ULTRASOFT",
] as const;

export const RAINFALL_COMPOUNDS = ["INTERMEDIATE", "WET"] as const;

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

export const LAP_TYPES = ["Inlap", "Lap", "Outlap"] as const;

export const RAINFALL_OPTIONS = ["Rainy", "No Rain"] as const;

export const NUMERICAL_WEATHER = [
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

export const ONE_STOP_PIT_STOPS = [
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
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

export const MEAN = {
  tireLife: 15.77451125074759,
  airTemp: 23.71641746992163,
  humidity: 52.11558948946384,
  pressure: 983.7748390253755,
  trackTemp: 35.58323067721967,
  windDirection: 163.08201356148103,
  windSpeed: 1.6702765889690634,
  lapTime: 91560.36786876587,
};

export const STD = {
  tireLife: 10.735457116712295,
  airTemp: 4.802486896246704,
  humidity: 16.92283459175855,
  pressure: 53.431724799758776,
  trackTemp: 8.999108619029267,
  windDirection: 100.15310589787812,
  windSpeed: 1.1501414448318825,
  lapTime: 14584.550919510772,
};

export const MIN = {
  lapTime: 55808,
  airTemp: 8.9,
  humidity: 5,
  pressure: 778.5,
  trackTemp: 13.8,
  windDirection: 0,
  windSpeed: 0,
};

export const MAX = {
  lapTime: 150970,
  airTemp: 37.2,
  humidity: 94.8,
  pressure: 1023.3,
  trackTemp: 57.5,
  windDirection: 359,
  windSpeed: 8.6,
};

export const STARTING_WEATHER: Weather = {
  rainfall: "No Rain",
  airTemp: 23.71641746992163,
  humidity: 52.11558948946384,
  pressure: 983.7748390253755,
  trackTemp: 35.58323067721967,
  windDirection: 163.08201356148103,
  windSpeed: 1.6702765889690634,
};
