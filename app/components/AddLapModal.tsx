import { useState } from "react";
import {
  CATEGORICAL_FIELDS,
  CATEGORICAL_OPTIONS,
  NUMERICAL_FIELDS,
} from "../constants";
import { IoClose } from "react-icons/io5";
import { convertToLap, fieldToName } from "../utils";
import { Lap } from "../types";

type Props = {
  addLap: (lap: Lap) => void;
  close: () => void;
};

const AddLapModal: React.FC<Props> = ({ addLap, close }) => {
  const [lap, setLap] = useState({
    lapType: "Lap",
    compound: "Soft",
    lapTime: "",
    stint: "",
    tireLife: "",
    trackStatus: "",
    position: "",
    airTemp: "",
    humidity: "",
    pressure: "",
    rainfall: "No Rain",
    trackTemp: "",
    windDirection: "",
    windSpeed: "",
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => setLap({ ...lap, [event.target.name]: event.target.value });

  const handleSubmit = () => {
    const convertedLap = convertToLap(lap);

    if (!convertedLap) return;

    console.log(convertedLap.lapType);
    console.log(lap.lapType);

    addLap(convertedLap);
    close();
  };

  return (
    <div className="fixed top-0 h-screen w-screen flex justify-center items-center backdrop-brightness-75">
      <div className="relative flex flex-col items-center bg-white p-5 rounded drop-shadow h-3/4 w-2/3">
        <button onClick={close} className="absolute top-5 right-5">
          <IoClose className="text-3xl" />
        </button>

        <h2 className="text-center font-bold uppercase text-4xl">Add Lap</h2>

        {CATEGORICAL_FIELDS.map((field, index) => (
          <div key={field}>
            <label htmlFor={field}>{fieldToName(field)}</label>
            <select name={field} value={lap[field]} onChange={handleChange}>
              {CATEGORICAL_OPTIONS[index].map(option => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {NUMERICAL_FIELDS.map(field => (
          <div key={field}>
            <label htmlFor={field}>{fieldToName(field)}</label>
            <input
              name={field}
              value={lap[field]}
              onChange={handleChange}
              className="border border-gray-300 rounded p-1"
            />
          </div>
        ))}

        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default AddLapModal;
