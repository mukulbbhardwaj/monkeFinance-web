import { FC } from "react";
import { Link } from "react-router-dom";

interface ModuleProps {
  id: number;
  name: string;
  desc: string;
  color: string;
}

const Module: FC<ModuleProps> = ({ name, desc, id, color }) => {
  const borderColor = color ? color : "green";

  return (
    <div className="w-64">
      <div className="flex gap-4 justify-center items-center">
        <div className="text-lg font-bold">{id}</div>
        <div className={`w-full h-0 border-2  border-${borderColor}`} />
      </div>
      <div className="ml-1">
        <Link to={`/modules/${id}`}>
          <div className="text-bold text-lg">{name}</div>
        </Link>
        <div className="text-sm text-secondary-foreground"> {desc}</div>
      </div>
    </div>
  );
};

export default Module;
