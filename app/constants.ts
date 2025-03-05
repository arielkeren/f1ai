export const COMPOUNDS = [
  "Soft",
  "Medium",
  "Hard",
  "Intermediate",
  "Wet",
] as const;

export const TEAMS = [
  "Red Bull Racing",
  "Racing Point",
  "Ferrari",
  "Haas F1 Team",
  "Toro Rosso",
  "Renault",
  "McLaren",
  "Mercedes",
  "Williams",
  "Alfa Romeo Racing",
] as const;

export const DRIVERS = [
  "GAS",
  "PER",
  "LEC",
  "STR",
  "MAG",
  "ALB",
  "KVY",
  "HUL",
  "RIC",
  "VER",
  "NOR",
  "HAM",
  "VET",
  "SAI",
  "RUS",
  "RAI",
  "BOT",
  "GRO",
  "KUB",
  "GIO",
] as const;

export const LAP_TYPES = ["Lap", "Inlap", "Outlap"] as const;

export const RAINFALL_OPTIONS = ["Rainy", "No Rain"] as const;

export const LAP_FIELDS = [
  "lapType",
  "compound",
  "lapTime",
  "stint",
  "tireLife",
  "trackStatus",
  "position",
  "airTemp",
  "humidity",
  "pressure",
  "rainfall",
  "trackTemp",
  "windDirection",
  "windSpeed",
] as const;

export const NUMERICAL_FIELDS = [
  "lapTime",
  "stint",
  "tireLife",
  "position",
  "airTemp",
  "humidity",
  "pressure",
  "trackTemp",
  "windDirection",
  "windSpeed",
  "trackStatus",
] as const;

export const CATEGORICAL_FIELDS = ["compound", "rainfall", "lapType"] as const;

export const CATEGORICAL_OPTIONS = [
  COMPOUNDS,
  RAINFALL_OPTIONS,
  LAP_TYPES,
] as const;
