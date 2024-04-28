import { FC } from "react";
import { Link } from "react-router-dom";

interface ModuleProps {
  id: number;
  name: string;
  desc: string;
  color: string;
}

const Module: FC<ModuleProps> = ({ name, desc, id, color }) => {
  

  return (
    <div className="lg:w-64">
      <div className="flex gap-4 justify-center items-center">
        <div className="text-2xl font-bold">{id}</div>
        <div className={`w-full h-0 border-2  border-${color}`} />
      </div>
      <div className="ml-1">
        <Link to={`/modules/${id}`} className="link">
          <div className="text-bold text-xl">{name}</div>
        </Link>
        <div className="text-sm text-secondary-foreground my-2"> {desc}</div>
      </div>
    </div>
  );
};

export default Module;
