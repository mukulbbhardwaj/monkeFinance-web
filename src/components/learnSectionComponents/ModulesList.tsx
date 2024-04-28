import { FC } from "react";
import modules from "./data/modules";
import Module from "./Module";

interface ListProps {}

const ModulesList: FC<ListProps> = () => {
  return (
    <div className="flex gap-4 flex-col lg:flex-row lg:gap-32">
      {modules.map((module) => (
        <Module
          id={module.id}
          name={module.name}
          desc={module.desc}
          color={module.color}
        />
      ))}
    </div>
  );
};

export default ModulesList;
