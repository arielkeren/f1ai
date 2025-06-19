import { FaCloud } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";
import useModal from "../hooks/useModal";
import { Weather, Driver, Team, Circuit } from "../types";
import RacerModal from "./RacerModal";
import WeatherModal from "./WeatherModal";

type Props = {
  weather: Weather;
  driver: Driver;
  team: Team;
  circuit: Circuit;
  changeWeather: (newWeather: Weather) => void;
  changeRacer: (driver: Driver, team: Team, circuit: Circuit) => void;
};

const Settings: React.FC<Props> = ({
  weather,
  driver,
  team,
  circuit,
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
      <div className="fixed bottom-5 right-5 flex gap-2">
        <button
          onClick={openWeather}
          className="bg-primary flex justify-center items-center w-12 h-12 rounded-xl transition-colors hover:bg-red-500"
        >
          <FaCloud className="text-white text-3xl" />
        </button>
        <button
          onClick={openRacer}
          className="bg-primary flex justify-center items-center w-12 h-12 rounded-xl transition-colors hover:bg-red-500"
        >
          <IoCarSport className="text-white text-3xl" />
        </button>
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
          selectedCircuit={circuit}
          changeRacer={changeRacer}
          close={closeRacer}
        />
      )}
    </>
  );
};

export default Settings;
