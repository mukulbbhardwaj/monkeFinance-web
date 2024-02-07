import { useEffect, useState } from "react";
import { getNews } from "../../api/news";
import { Link } from "react-router-dom";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  image_url: string;
}

const LatestNewsSection = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getNews();
        const data = (await res.data) || [];
        setNewsData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className=" p-4">
      <h1>Latest News</h1>
      <ul className="flex flex-wrap">
        {newsData?.map((item, index) => (
          <li key={index} className="bg-black p-4 m-4 rounded-xl w-80 ">
            <img
              src={item.image_url}
              className="w-full h-32 rounded-xl mb-4"
            ></img>
            <Link to={item.url} target="_blank">
              <strong className="text-lg text-heading">{item.title} </strong>
            </Link>
            <p className="text-wrap text-sm text-sub-heading">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestNewsSection;
