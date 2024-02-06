import { FC } from "react";

interface ArticleItemProps {
  title: string;
  description: string;
}

const ArticleItem: FC<ArticleItemProps> = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ArticleItem;
