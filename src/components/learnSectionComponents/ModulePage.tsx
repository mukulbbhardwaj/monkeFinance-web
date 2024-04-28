import { FC, useEffect, useState } from "react";
import chapters from "./data/chapters";
import { Link, useParams } from "react-router-dom";
import modules from "./data/modules";
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
  const rawId = useParams<{ id: string }>().id || "";
  const numericId = parseInt(rawId?.toString(), 10);
  const [currentModuleChapters, setCurrentModuleChapters] = useState<
    ChapterObject[]
  >([]);
  useEffect(() => {
    const filteredChapters =
      chapters.find((chapterGroup) => chapterGroup.module === numericId)
        ?.chapters || [];
    setCurrentModuleChapters(filteredChapters);
  }, [numericId, rawId]);
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="w-9/12">
          <h2 className="text-4xl my-8">
            Module: {modules.find((module) => module.id === numericId)?.name}
          </h2>
          {currentModuleChapters.map((chapter) => (
            <div key={chapter.chapterID} className="m-4">
              <Link to={`chapter/${chapter.chapterID}`}>
                <div className="text-2xl ">
                  {chapter.chapterID} {chapter.chapterName}
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
