import {
  CIRCUIT_TO_DISTANCE, // Import circuit distance mapping
  CIRCUIT_TO_LAPS, // Import circuit laps mapping
  CIRCUIT_TO_MAX_STINTS, // Import max stints per compound per circuit
  KG_FUEL_PER_KM, // Import fuel usage per km
  SECONDS_PER_KG_FUEL, // Import seconds lost per kg of fuel
  STARTING_FUEL, // Import starting fuel constant
  TIRE_WEAR, // Import tire wear per compound
} from "./constants";
import { Circuit, Compound, Driver, Team, Weather } from "./types"; // Import type definitions

const generateAllStrategies = (
  totalLaps: number, // Total number of laps in the race
  maxStints: number[] // Maximum stints allowed for each compound
): { combo: number[]; laps: number[] }[] => {
  // Returns array of strategy objects
  const results: { combo: number[]; laps: number[] }[] = []; // Initialize results array

  // Generate all legal compound combinations (1–3 stints)
  function generateCombos(): number[][] {
    // Returns array of compound combos
    const compounds = [0, 1, 2]; // 0: Soft, 1: Medium, 2: Hard
    const combos: number[][] = []; // Store valid combos

    function recurse(current: number[], depth: number, maxDepth: number) {
      // Recursive helper
      if (depth === maxDepth) {
        // If reached desired depth
        const unique = new Set(current); // Unique compounds in combo
        const hardCount = current.filter(c => c === 2).length; // Count of hard tires
        if (unique.size >= 2 && hardCount <= 2) {
          // At least 2 compounds, max 2 hards
          combos.push([...current]); // Add valid combo
        }
        return; // End recursion
      }

      for (const compound of compounds) {
        // Loop through compounds
        current.push(compound); // Add compound to current combo
        recurse(current, depth + 1, maxDepth); // Recurse to next depth
        current.pop(); // Remove last compound for next iteration
      }
    }

    for (let i = 1; i <= 3; i++) recurse([], 0, i); // Generate combos of length 1 to 3
    return combos; // Return all valid combos
  }

  // Generate all valid lap splits for a given compound combo
  function generateLapSplits(combo: number[]): number[][] {
    // Returns array of lap splits
    const splits: number[][] = []; // Store valid splits

    function recurse(current: number[], depth: number, remaining: number) {
      // Recursive helper
      if (depth === combo.length - 1) {
        // If at last stint
        const lastCompound = combo[depth]; // Get last compound
        if (remaining >= 5 && remaining <= maxStints[lastCompound]) {
          // Check stint length
          splits.push([...current, remaining]); // Add valid split
        }
        return; // End recursion
      }

      const compound = combo[depth]; // Current compound
      const max = Math.min(
        maxStints[compound], // Max allowed for this compound
        remaining - (combo.length - 1 - depth) * 5 // Ensure enough laps left for minimum stints
      );

      for (let i = 5; i <= max; i++) {
        // Loop through possible stint lengths
        current.push(i); // Add stint length
        recurse(current, depth + 1, remaining - i); // Recurse to next stint
        current.pop(); // Remove last stint for next iteration
      }
    }

    recurse([], 0, totalLaps); // Start recursion
    return splits; // Return all valid splits
  }

  // Combine combos with all their lap splits
  const allCombos = generateCombos(); // Get all valid compound combos
  for (const combo of allCombos) {
    // For each combo
    const allSplits = generateLapSplits(combo); // Get all valid splits
    for (const laps of allSplits) {
      // For each split
      results.push({ combo, laps }); // Add to results
    }
  }

  return results; // Return all strategies
};

const applyTireWear = (
  stint: number[],
  compound: Compound // Apply tire wear to stint lap times
) =>
  stint.map(
    (lapTime, index) => lapTime + 1000 * (index + 1) * TIRE_WEAR[compound] // Increase lap time by tire wear
  );

const applyFuel = (
  stint: number[],
  circuit: Circuit // Apply fuel effect to stint lap times
) =>
  stint.map(
    (lapTime, index) =>
      lapTime +
      1000 *
        (STARTING_FUEL - // Calculate remaining fuel
          (index + 1) * CIRCUIT_TO_DISTANCE[circuit] * KG_FUEL_PER_KM) * // Fuel used so far
        SECONDS_PER_KG_FUEL // Convert fuel weight to time loss
  );

const calculateStint = (
  compound: Compound, // Tire compound for the stint
  circuit: Circuit, // Circuit identifier
  driver: Driver, // Driver identifier
  team: Team, // Team identifier
  weather: Weather, // Weather conditions
  initialLapTimes: number[], // Initial lap times for the stint
  runModel: (
    // Prediction model function
    lapTimes: number[],
    tireLife: number[],
    compound: Compound,
    circuit: Circuit,
    driver: Driver,
    team: Team,
    weather: Weather
  ) => number
) => {
  const stint = initialLapTimes; // Start with initial lap times
  const lastLapTimes = initialLapTimes; // Track last lap times for prediction
  let maxStint = 0; // Max laps for this stint
  if (compound == "SOFT")
    maxStint = CIRCUIT_TO_MAX_STINTS[circuit].soft; // Get max for soft
  else if (compound == "MEDIUM")
    maxStint = CIRCUIT_TO_MAX_STINTS[circuit].medium; // Get max for medium
  else maxStint = CIRCUIT_TO_MAX_STINTS[circuit].hard; // Get max for hard

  for (let i = 4; i <= maxStint; i++) {
    // Predict laps from 4 to maxStint
    const prediction = runModel(
      lastLapTimes, // Use last lap times as input
      [i - 3, i - 2, i - 1], // Tire life for last 3 laps
      compound, // Compound for this stint
      circuit, // Circuit
      driver, // Driver
      team, // Team
      weather // Weather
    );

    stint.push(prediction); // Add predicted lap time to stint
    lastLapTimes.push(prediction); // Update last lap times
    lastLapTimes.shift(); // Remove oldest lap time
  }

  return stint; // Return full stint lap times
};

const tryCombinations = (
  compound: Compound, // Compound to try
  initialSoft: number[], // Initial lap times for soft
  initialMedium: number[], // Initial lap times for medium
  initialHard: number[], // Initial lap times for hard
  circuit: Circuit, // Circuit identifier
  driver: Driver, // Driver identifier
  team: Team, // Team identifier
  weather: Weather, // Weather conditions
  runModel: (
    // Prediction model function
    lapTimes: number[],
    tireLife: number[],
    compound: Compound,
    circuit: Circuit,
    driver: Driver,
    team: Team,
    weather: Weather
  ) => number
) => {
  const initials = [initialSoft, initialMedium, initialHard]; // Array of initial lap times for each compound

  let stints = initials.map(
    initial =>
      calculateStint(
        compound,
        circuit,
        driver,
        team,
        weather,
        initial,
        runModel
      ) // Calculate stint for each compound
  );

  stints = stints.map(stint => applyTireWear(stint, compound)); // Apply tire wear to each stint
  stints = stints.map(stint => applyFuel(stint, circuit)); // Apply fuel effect to each stint

  const compoundToMax = CIRCUIT_TO_MAX_STINTS[circuit]; // Get max stints for each compound
  const maxStints = [
    compoundToMax.soft, // Max for soft
    compoundToMax.medium, // Max for medium
    compoundToMax.hard, // Max for hard
  ];

  const combinations = generateAllStrategies(
    CIRCUIT_TO_LAPS[circuit], // Total laps for circuit
    maxStints // Max stints per compound
  );
};
