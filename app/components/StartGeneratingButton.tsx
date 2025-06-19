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
      disabled={isGenerating}
      className={`flex justify-center items-center gap-2 text-xl font-medium text-white w-96 h-16 uppercase rounded-xl transition-colors ${
        isGenerating ? "bg-red-700" : "bg-primary hover:bg-red-500"
      }`}
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
