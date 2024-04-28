import { FC } from "react";
import { useParams } from "react-router-dom";


// import chapters from "./data/chapters";

interface ChapterPageProps {}

const ChapterPage: FC<ChapterPageProps> = () => {
    const { chapterID } = useParams();
    // const chapterContent = chapters[0].chapters[0].chapterContent;
    return (
      <div>
        ChapterPage: ID: {chapterID}{" "}
        <div>
          {/* <Markdown>{chapterContent}</Markdown> */}
        </div>
      </div>
    );
};

export default ChapterPage;
