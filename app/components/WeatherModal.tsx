import { useState } from "react"; // Import React useState hook
import { Weather } from "../types"; // Import Weather type
import { MAX, MIN, WEATHER } from "../constants"; // Import constants for weather fields
import { weatherFieldToName } from "../utils"; // Import utility to get weather field display name
import Modal from "./Modal"; // Import Modal component

type Props = {
  // Define props type for WeatherModal
  selectedWeather: Weather; // Currently selected weather object
  changeWeather: (newWeather: Weather) => void; // Function to change weather
  close: () => void; // Function to close the modal
};

const WeatherModal: React.FC<Props> = ({
  // WeatherModal functional component
  selectedWeather, // Destructure selectedWeather from props
  changeWeather, // Destructure changeWeather from props
  close, // Destructure close from props
}) => {
  const [weather, setWeather] = useState<Weather>(selectedWeather); // State for weather, initialized from props

  const changeField = (
    event: React.ChangeEvent<HTMLInputElement> // Handler for input change
  ) =>
    setWeather({ ...weather, [event.target.name]: Number(event.target.value) }); // Update weather state for changed field

  const handleSubmit = () => {
    // Handler for submit
    changeWeather(weather); // Call changeWeather with updated weather
    close(); // Close the modal
  };

  return (
    <Modal title="Weather Options" submit={handleSubmit} close={close}>
      {/* Render Modal component */}
      {WEATHER.map(
        (
          field // Map over all weather fields
        ) => (
          <div key={field} className="flex items-center gap-2">
            {/* Row for each weather field */}
            <label htmlFor={field} className="font-medium uppercase">
              {/* Label for weather field */}
              {weatherFieldToName(field)}
            </label>
            <input
              name={field} // Name of the input (weather field)
              type="range" // Input type is range slider
              step="0.01" // Step size for slider
              min={MIN[field]} // Minimum value for this field
              max={MAX[field]} // Maximum value for this field
              value={weather[field]} // Value bound to weather state
              onChange={changeField} // On change handler
              className="h-2 bg-gray-200 rounded-lg accent-neutral-700 appearance-none cursor-pointer" // Styling classes
            />
            <p>{Math.round(weather[field] * 100) / 100}</p>{" "}
            {/* Display current value rounded to 2 decimals */}
          </div>
        )
      )}
    </Modal>
  );
};

export default WeatherModal; //
