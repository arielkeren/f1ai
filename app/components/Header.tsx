import useModal from "../hooks/useModal";
import { Driver, Team } from "../types";
import { IoMdSettings } from "react-icons/io";
import SettingsModal from "./SettingsModal";

type Props = {
  selectedDriver: Driver;
  selectedTeam: Team;
  changeRacer: (driver: Driver, team: Team) => void;
};

const Header: React.FC<Props> = ({
  selectedDriver,
  selectedTeam,
  changeRacer,
}) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="flex justify-center items-center p-5 bg-gray-900 drop-shadow-xl">
        <h1 className="text-5xl font-bold font-mono m-auto text-white">F1AI</h1>
        <button
          onClick={open}
          className="bg-gray-800 flex justify-center items-center w-12 h-12 rounded-full transition-all hover:bg-gray-700 hover:rotate-180"
        >
          <IoMdSettings className="text-white text-3xl" />
        </button>
      </div>

      {isOpen && (
        <SettingsModal
          selectedDriver={selectedDriver}
          selectedTeam={selectedTeam}
          changeRacer={changeRacer}
          close={close}
        />
      )}
    </>
  );
};

export default Header;
