import useModal from "../hooks/useModal";
import { Compound, Driver, Team, Weather } from "../types";
import { IoCarSport } from "react-icons/io5";
import { FaCloud } from "react-icons/fa6";
import RacerModal from "./RacerModal";
import WeatherModal from "./WeatherModal";

type Props = {
  weather: Weather;
  driver: Driver;
  team: Team;
  initialCompound: Compound;
  changeWeather: (newWeather: Weather) => void;
  changeRacer: (driver: Driver, team: Team, initialCompound: Compound) => void;
};

const Header: React.FC<Props> = ({
  weather,
  driver,
  team,
  initialCompound,
  changeWeather,
  changeRacer,
}) => {
  const {
    isOpen: isRacerOpen,
    open: openRacer,
    close: closeRacer,
  } = useModal();
  const {
    isOpen: isWeatherOpen,
    open: openWeather,
    close: closeWeather,
  } = useModal();

  return (
    <>
      <div className="relative flex justify-center items-center p-5 bg-gray-900 drop-shadow-xl">
        <h1 className="text-5xl font-bold font-mono m-auto text-white">F1AI</h1>
        <div className="absolute right-5 flex gap-2">
          <button
            onClick={openWeather}
            className="bg-gray-800 flex justify-center items-center w-12 h-12 rounded-xl transition-colors hover:bg-gray-700"
          >
            <FaCloud className="text-white text-3xl" />
          </button>
          <button
            onClick={openRacer}
            className="bg-gray-800 flex justify-center items-center w-12 h-12 rounded-xl transition-colors hover:bg-gray-700"
          >
            <IoCarSport className="text-white text-3xl" />
          </button>
        </div>
      </div>

      {isWeatherOpen && (
        <WeatherModal
          selectedWeather={weather}
          changeWeather={changeWeather}
          close={closeWeather}
        />
      )}

      {isRacerOpen && (
        <RacerModal
          selectedDriver={driver}
          selectedTeam={team}
          selectedInitialCompound={initialCompound}
          changeRacer={changeRacer}
          close={closeRacer}
        />
      )}
    </>
  );
};

export default Header;
