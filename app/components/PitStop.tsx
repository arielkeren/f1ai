import { Compound } from "../types";

type Props = {
  compound: Compound;
};

const PitStop: React.FC<Props> = ({ compound }) => (
  <div className="bg-red-200 rounded flex flex-col justify-center items-center drop-shadow h-24 cursor-pointer transition-colors hover:bg-gray-200">
    <p className="uppercase font-bold text-xl">Switch to</p>
    <p className="font-medium uppercase">{compound}</p>
  </div>
);

export default PitStop;
