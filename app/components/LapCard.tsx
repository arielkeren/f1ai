import { LAP_FIELDS } from "../constants";
import { Lap } from "../types";
import { fieldToName } from "../utils";

type Props = {
  lap: Lap;
  lapNumber: number;
};

const LapCard: React.FC<Props> = ({ lap, lapNumber }) => {
  return (
    <div className="bg-gray-100 rounded drop-shadow p-5">
      <h2 className="text-center uppercase font-bold text-xl">
        Lap {lapNumber}
      </h2>
      {LAP_FIELDS.map(field => (
        <p key={field}>
          <span>{fieldToName(field)}</span> {lap[field]}
        </p>
      ))}
    </div>
  );
};

export default LapCard;
