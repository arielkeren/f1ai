import { IoClose } from "react-icons/io5";
import { PiGearFill } from "react-icons/pi";

type Props = {
  children: React.ReactNode;
  title: string;
  submit: () => void;
  close: () => void;
};

const Modal: React.FC<Props> = ({ children, title, submit, close }) => (
  <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-brightness-75 z-10">
    <div className="relative flex flex-col gap-10 items-center bg-white p-5 rounded drop-shadow h-1/2 w-1/2">
      <button onClick={close} className="absolute top-5 right-5">
        <IoClose className="text-3xl" />
      </button>

      <h2 className="text-center font-bold uppercase text-4xl">{title}</h2>

      <div className="flex flex-col gap-2">{children}</div>

      <button
        onClick={submit}
        className="flex items-center gap-1 bg-gray-900 text-white px-20 py-3 uppercase rounded transition-colors hover:bg-gray-800"
      >
        <PiGearFill />
        Set
      </button>
    </div>
  </div>
);

export default Modal;
