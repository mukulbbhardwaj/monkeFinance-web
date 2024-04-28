import { FC } from "react";
import modules from "./data/modules";
import Module from "./Module";

interface ListProps {}

const ModulesList: FC<ListProps> = () => {
  return (
    <div className="flex gap-32 flex-col lg:flex-row">
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
