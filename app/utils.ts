export const formatLapTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
};

export const standardize = (value: number, mean: number, std: number) =>
  (value - mean) / std;

export const encode = (value: string, values: readonly string[]) => {
  const encoded = Array(values.length).fill(0);
  encoded[values.indexOf(value)] = 1;

  return encoded;
};
