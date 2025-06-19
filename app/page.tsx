"use client";

import { useState } from "react";
import { Driver, Team, Weather, Circuit, Compound } from "./types";
import Header from "./components/Header";
import InitialLaps from "./components/InitialLaps";
import useModel from "./hooks/useModel";
import {
  DRIVERS,
  STARTING_WEATHER,
  TEAMS,
  CIRCUIT_NAMES,
  PIT_STOP_PENALTY_MS,
} from "./constants";
import StartGeneratingButton from "./components/StartGeneratingButton";
import Strategy from "./components/Strategy";
import {
  CIRCUIT_TO_DISTANCE, // Import circuit distance mapping
  CIRCUIT_TO_LAPS, // Import circuit laps mapping
  CIRCUIT_TO_MAX_STINTS,
  COMPOUNDS, // Import max stints per compound per circuit
  KG_FUEL_PER_KM, // Import fuel usage per km
  SECONDS_PER_KG_FUEL, // Import seconds lost per kg of fuel
  STARTING_FUEL, // Import starting fuel constant
  TIRE_WEAR, // Import tire wear per compound
} from "./constants";
import useModal from "./hooks/useModal";
import Settings from "./components/Settings";

const Home: React.FC = () => {
  const [initialLapTimes, setInitialLapTimes] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [driver, setDriver] = useState<Driver>(DRIVERS[0]);
  const [team, setTeam] = useState<Team>(TEAMS[0]);
  const [weather, setWeather] = useState<Weather>(STARTING_WEATHER);
  const [circuit, setCircuit] = useState<Circuit>(CIRCUIT_NAMES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategies, setStrategies] = useState<
    { time: number; laps: number[]; combo: number[] }[] | null
  >(null);

  const runModel = useModel();

  const generateAllStrategies = (
    totalLaps: number, // Total number of laps in the race
    maxStints: number[] // Maximum stints allowed for each compound
  ): { combo: number[]; laps: number[] }[] => {
    // Returns array of strategy objects
    const results: { combo: number[]; laps: number[] }[] = []; // Initialize results array

    // Generate all legal compound combinations (1–3 stints)
    function generateCombos(): number[][] {
      const compounds = [0, 1, 2];
      const combos: number[][] = [];

      function recurse(current: number[], start: number, maxDepth: number) {
        if (current.length === maxDepth) {
          const unique = new Set(current);
          const hardCount = current.filter(c => c === 2).length;
          if (unique.size >= 2 && hardCount <= 2) {
            combos.push([...current]);
          }
          return;
        }

        for (let i = start; i < compounds.length; i++) {
          current.push(compounds[i]);
          recurse(current, i, maxDepth); // allow repeats, but always in non-decreasing order
          current.pop();
        }
      }

      for (let i = 2; i <= 4; i++) recurse([], 0, i);
      return combos;
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

  const calculateStint = async (
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
      driver: Driver,
      team: Team,
      weather: Weather
    ) => Promise<number>
  ) => {
    const stint = [...initialLapTimes]; // Start with initial lap times
    const lastLapTimes = [...initialLapTimes]; // Track last lap times for prediction
    let maxStint = 0; // Max laps for this stint
    if (compound == "SOFT")
      maxStint = CIRCUIT_TO_MAX_STINTS[circuit].soft; // Get max for soft
    else if (compound == "MEDIUM")
      maxStint = CIRCUIT_TO_MAX_STINTS[circuit].medium; // Get max for medium
    else maxStint = CIRCUIT_TO_MAX_STINTS[circuit].hard; // Get max for hard

    for (let i = 4; i <= maxStint; i++) {
      // Predict laps from 4 to maxStint
      const prediction = await runModel(
        lastLapTimes, // Use last lap times as input
        [i - 3, i - 2, i - 1], // Tire life for last 3 laps
        compound, // Compound for this stint
        driver, // Driver
        team, // Team
        weather // Weather
      );

      stint.push(prediction); // Add predicted lap time to stint
      lastLapTimes[0] = lastLapTimes[1]; // Shift last lap times
      lastLapTimes[1] = lastLapTimes[2]; // Shift last lap times again
      lastLapTimes[2] = prediction; // Update last lap times
    }

    return stint; // Return full stint lap times
  };

  const sumLapTimes = (stint: number[]) => {
    for (let i = 1; i < stint.length; i++) stint[i] += stint[i - 1];
  };

  const getStrategies = async (
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
      driver: Driver,
      team: Team,
      weather: Weather
    ) => Promise<number>
  ) => {
    const initials = [[...initialSoft], [...initialMedium], [...initialHard]]; // Array of initial lap times for each compound

    let stints: number[][] = [];

    for (let i = 0; i < initials.length; i++)
      stints.push(
        await calculateStint(
          COMPOUNDS[i], // Compound for this stint
          circuit,
          driver,
          team,
          weather,
          initials[i],
          runModel
        ) // Calculate stint for each compound
      );

    stints = stints.map((stint, index) =>
      applyTireWear(stint, COMPOUNDS[index])
    ); // Apply tire wear to each stint
    stints = stints.map(stint => applyFuel(stint, circuit)); // Apply fuel effect to each stint

    stints.forEach(stint => sumLapTimes(stint)); // Sum lap times for each stint

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

    const times = combinations.map(combo => {
      let sum = 0;
      for (let i = 0; i < combo.laps.length; i++)
        sum += stints[combo.combo[i]][combo.laps[i] - 1];
      // Add pit stop penalty: one for each pit stop (number of stints - 1)
      sum += (combo.laps.length - 1) * PIT_STOP_PENALTY_MS;
      return sum;
    });

    const seen = new Set<string>();
    const uniqueCombinations: { combo: number[]; laps: number[] }[] = [];
    const uniqueTimes: number[] = [];

    for (let i = 0; i < combinations.length; i++) {
      // Create a key that is order-independent
      const zipped = combinations[i].combo.map((c, idx) => [
        c,
        combinations[i].laps[idx],
      ]);
      // Sort by compound then laps to normalize
      zipped.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const key = JSON.stringify(zipped);

      if (!seen.has(key)) {
        seen.add(key);
        uniqueCombinations.push(combinations[i]);
        uniqueTimes.push(times[i]);
      }
    }

    // After deduplication, but before picking the best 5:
    const merged = mergeStrategies(
      uniqueCombinations.map((combo, i) => ({
        combo: combo.combo,
        laps: combo.laps,
        time: uniqueTimes[i], // Attach time for sorting
      }))
    );

    // Assign a representative time to each merged strategy (e.g., minimum time in the group)
    const mergedWithTime = merged.map(group => {
      // Find all original strategies matching this combo
      const groupStrategies = uniqueCombinations
        .map((combo, i) => ({
          combo: combo.combo,
          laps: combo.laps,
          time: uniqueTimes[i],
        }))
        .filter(s => JSON.stringify(s.combo) === JSON.stringify(group.combo));
      // Use the minimum time for this group
      const minTime = Math.min(...groupStrategies.map(s => s.time));
      return { ...group, time: minTime };
    });
    // console.log(mergedWithTime.sort((a, b) => a.time - b.time));

    // Sort and pick the best 5
    const best5 = mergedWithTime.sort((a, b) => a.time - b.time).slice(0, 5);

    return best5;
  };

  const changeWeather = (newWeather: Weather) => setWeather(newWeather);

  const changeRacer = (driver: Driver, team: Team, circuit: Circuit) => {
    setDriver(driver);
    setTeam(team);
    setCircuit(circuit);
  };

  const changeLap = (
    lapTime: number,
    lapNumber: number,
    compoundIndex: number
  ) => {
    const newLaps = JSON.parse(JSON.stringify(initialLapTimes));
    newLaps[compoundIndex][lapNumber - 1] = lapTime;
    setInitialLapTimes(newLaps);
  };

  const startGenerating = async () => {
    if (
      initialLapTimes.some(compoundLapTimes =>
        compoundLapTimes.some(lapTime => lapTime === 0)
      )
    )
      return;

    setIsGenerating(true);

    const strategies = await getStrategies(
      initialLapTimes[0],
      initialLapTimes[1],
      initialLapTimes[2],
      circuit,
      driver,
      team,
      weather,
      runModel
    );

    setStrategies(strategies);
    setIsGenerating(false);
  };

  function mergeStrategies(
    strategies: { combo: number[]; laps: number[]; time: number }[]
  ): { combo: number[]; laps: number[]; time: number }[] {
    const map = new Map<
      string,
      { combo: number[]; laps: number[]; time: number }
    >();

    for (const strat of strategies) {
      const key = JSON.stringify(strat.combo); // Use combo (order matters) as key
      if (!map.has(key) || strat.time < map.get(key)!.time) {
        map.set(key, {
          combo: strat.combo,
          laps: strat.laps,
          time: strat.time,
        });
      }
    }

    return Array.from(map.values());
  }

  return (
    <>
      <Header />
      <div className="bg-[#1A1A1A] m-10 rounded-xl py-5">
        <InitialLaps lapTimes={initialLapTimes} changeLap={changeLap} />
        <StartGeneratingButton
          isGenerating={isGenerating}
          startGenerating={startGenerating}
        />
        {strategies && <Strategy strategies={strategies} />}
      </div>
      <Settings
        weather={weather}
        driver={driver}
        team={team}
        circuit={circuit}
        changeWeather={changeWeather}
        changeRacer={changeRacer}
      />
    </>
  );
};

export default Home;
