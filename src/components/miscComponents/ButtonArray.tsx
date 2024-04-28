import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC } from "react";

interface ButtonArrayProps {}

const ButtonArray: FC<ButtonArrayProps> = () => {
  return (
    <div className="flex gap-8 text-sm items-center">
      <button className="flex items-center ">
        <ArrowLeft size={16} /> Previous
      </button>
      <button>Chapters</button>
      <button className="flex items-center">
        Next <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default ButtonArray;
