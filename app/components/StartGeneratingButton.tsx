import { BsStars } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  isGenerating: boolean;
  startGenerating: () => void;
};

const StartGeneratingButton: React.FC<Props> = ({
  isGenerating,
  startGenerating,
}) => (
  <div className="flex justify-center mt-10">
    <button
      onClick={startGenerating}
      className="flex items-center gap-2 text-xl font-medium bg-gray-900 text-white px-20 py-5 uppercase rounded transition-colors hover:bg-gray-800"
    >
      {isGenerating ? (
        <>
          <AiOutlineLoading className="animate-spin" />
          Generating Strategy
        </>
      ) : (
        <>
          <BsStars />
          Start Generating
        </>
      )}
    </button>
  </div>
);

export default StartGeneratingButton;
