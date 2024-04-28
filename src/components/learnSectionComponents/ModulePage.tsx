import { FC, useEffect, useState } from "react";
import modules from "./data/modules";
import { Link, useParams } from "react-router-dom";
import Layout from "@/Layout";
// import { Link } from "react-router-dom";

interface ModulePageProps {
  //   id: number;
}
interface ChapterObject {
  chapterID: number;
  chapterName: string;
  chapterDesc: string;
}

const ModulePage: FC<ModulePageProps> = () => {
  const { id } = useParams();
  const color = modules[parseInt(id!)].color;
  const numId = parseInt(id!);
  const [currentModuleChapters, setCurrentModuleChapters] = useState<
    ChapterObject[]
  >([]);
  useEffect(() => {
    const chapters = modules[numId].chapters;
    setCurrentModuleChapters(chapters);
  }, [id, numId]);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="lg:w-9/12">
          <div className="border-b py-8 my-16">
            <div className="flex gap-4 items-center">
              <div className="text-6xl font-bold">{id}</div>
              <div className={`w-1/2 border-2 border-${color}`} />
            </div>
            <h2 className="text-4xl">{modules[numId].name}</h2>
          </div>

          {currentModuleChapters.map((chapter) => (
            <div key={chapter.chapterID} className="m-4 ">
              <Link to={`chapter/${chapter.chapterID}`}>
                <div className="text-2xl w-max link ">
                  {chapter.chapterID}. {chapter.chapterName}
                </div>
              </Link>

              <div className="text-secondary-foreground m-2">
                {chapter.chapterDesc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ModulePage;
