import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RainfallOption, Weather } from "../types";
import { MAX, MIN, NUMERICAL_WEATHER, RAINFALL_OPTIONS } from "../constants";
import { ImArrowUp } from "react-icons/im";
import { weatherFieldToName } from "../utils";

type Props = {
  selectedWeather: Weather;
  changeWeather: (newWeather: Weather) => void;
  close: () => void;
};

const WeatherModal: React.FC<Props> = ({
  selectedWeather,
  changeWeather,
  close,
}) => {
  const [weather, setWeather] = useState<Weather>(selectedWeather);

  const changeRainfall = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setWeather({ ...weather, rainfall: event.target.value as RainfallOption });

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWeather({ ...weather, [event.target.name]: Number(event.target.value) });

  const handleSubmit = () => {
    changeWeather(weather);
    close();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-brightness-75 z-10">
      <div className="relative flex flex-col gap-10 items-center bg-white p-5 rounded drop-shadow h-1/2 w-1/2">
        <button onClick={close} className="absolute top-5 right-5">
          <IoClose className="text-3xl" />
        </button>

        <h2 className="text-center font-bold uppercase text-4xl">
          Weather Options
        </h2>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor="Rainfall" className="font-medium uppercase">
              Rainfall
            </label>
            <select
              name="Rainfall"
              value={weather.rainfall}
              onChange={changeRainfall}
              className="border border-gray-300 rounded p-1 drop-shadow"
            >
              {RAINFALL_OPTIONS.map(option => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {NUMERICAL_WEATHER.map(field => (
            <div key={field} className="flex items-center gap-2">
              <label htmlFor={field} className="font-medium uppercase">
                {weatherFieldToName(field)}
              </label>
              <input
                name={field}
                type="range"
                min={MIN[field]}
                max={MAX[field]}
                value={weather[field]}
                onChange={changeField}
                className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-1 bg-gray-900 text-white px-20 py-3 uppercase rounded transition-colors hover:bg-gray-800"
        >
          <ImArrowUp />
          Apply
        </button>
      </div>
    </div>
  );
};

export default WeatherModal;
