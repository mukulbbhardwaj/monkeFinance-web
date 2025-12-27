import { FC } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import heroBanner from "../assets/heroBanner.png";

interface LandingPageProps {}

const exploreItems: { title: string; url: string; color: string }[] = [
  {
    title: "Start Paper Trading",
    url: "/dashboard",
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
    <Layout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 lg:mb-16 gap-8">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl lg:text-6xl leading-tight font-bold mb-4 mt-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Decode Finance.
              <br /> Trade Virtually.
              <br /> Learn Money.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Uncover financial secrets, practice in a virtual environment,
              and master managing finances. Simplifying finance, one trade at
              a time.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={heroBanner}
              alt="Hero Illustration"
              className="w-full max-w-md lg:max-w-lg mt-6 hidden lg:block animate-fade-in"
            />
          </div>
        </div>

        {/* Explore Section */}
        <div className="my-12 lg:my-16">
          <h2 className="text-3xl font-bold mb-8">Explore</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {exploreItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`${item.color} p-12 font-lg border border-border w-full sm:w-64 h-40 flex justify-center items-center text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 text-black`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="my-12 lg:my-16">
          <h2 className="text-3xl font-bold mb-8">What We Do</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featureItems.map((item) => (
              <div 
                key={item.heading} 
                className="p-6 border border-border rounded-xl bg-card hover:bg-card-hovered transition-all duration-300 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">{item.heading}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
