import { FC } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import heroBanner from "../assets/heroBanner.png";

interface LandingPageProps {}

const exploreItems: { title: string; url: string; color: string }[] = [
  {
    title: " Start Paper Trading",
    url: "/dashboard/:id",
    color: "bg-[#e38786]",
  },
  {
    title: "Learn about finance",
    url: "/learn",
    color: "bg-blue-100",
  },
  {
    title: "Read Blogs",
    url: "/blogs",
    color: "bg-[#abeda1]",
  },
];

const featureItems: { heading: string; desc: string }[] = [
  {
    heading: "Practice Without Risk, Trade with Confidence",
    desc: "Master the art of investing with our risk-free virtual trading. Test strategies, refine skills, and build confidence using real-time market data. Perfect for beginners and experienced traders alike.",
  },
  {
    heading: "Unlock In-Depth Financial Knowledge",
    desc: "Elevate your financial understanding with expertly crafted video tutorials, articles, and interactive lessons. Whether a beginner or advanced trader, our platform provides a dynamic learning experience.",
  },
];

const LandingPage: FC<LandingPageProps> = () => {
  return (
    <div className="">
      <Layout>
        <div className="flex flex-col">
          <div className="flex justify-between align-center items-center mb-4">
            <div className=" lg:w-1/2">
              <h1 className="text-4xl leading-tight font-bold mb-4 mt-8">
                Decode Finance.
                <br /> Trade Virtually.
                <br /> Learn Money.
              </h1>
              <p className="text-sm ml-1 text-secondary-foreground ">
                - Uncover financial secrets, practice in a virtual environment,
                and master managing finances. Simplifying finance, one trade at
                a time.
              </p>
            </div>
            <img
              src={heroBanner}
              alt="Hero Illustration"
              className="w-96 mt-6 hidden lg:block"
            />
          </div>

          <div className="my-8 ">
            <h2 className="text-2xl font-bold mb-4">Explore</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center text-black ">
              {exploreItems.map((item) => (
                <div key={item.title}>
                  <Link
                    to={item.url}
                    className={` ${item.color} mr-4 p-16 mb-4 font-lg border border-border w-64 h-32 flex justify-center items-center text-center font-bold rounded-3xl hover:bg-card-hovered hover:scale-105`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold">What We Do</h2>
          <div className="my-8 flex flex-col lg:flex-row ">
            {featureItems.map((item) => (
              <div key={item.heading} className="p-4 border rounded-xl m-1">
                <h1 className="text-xl m-4">{item.heading}</h1>
                <p className="text-sm text-secondary-foreground m-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LandingPage;
