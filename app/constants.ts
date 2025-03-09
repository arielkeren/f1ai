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
  airTemp: 8.9,
  humidity: 5,
  pressure: 778.5,
  trackTemp: 13.8,
  windDirection: 0,
  windSpeed: 0,
};

export const MAX = {
  airTemp: 37.2,
  humidity: 94.8,
  pressure: 1023.3,
  trackTemp: 57.5,
  windDirection: 359,
  windSpeed: 8.6,
};
