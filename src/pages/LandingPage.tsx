import { FC, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
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

const LandingPage: FC<LandingPageProps> = () => {
  // const userStore = useStore();
  useEffect(() => {
    // console.log(userStore.user);
  });
  return (
    <div className="">
      <Layout>
        <div className="flex flex-col">
          {/* HERO SECTION */}
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
                <div>
                  <Link
                    key={item.title}
                    to={item.url}
                    className={` ${item.color} mr-4 p-16 mb-4 font-lg border border-border w-64 h-32 flex justify-center items-center text-center font-bold rounded-3xl hover:bg-card-hovered hover:scale-105`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT DO WE DO SECTION */}
          <div className="my-8">
            {/* Content describing what your project does */}
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-lg">Feautures</p>
          </div>

          {/* RECENT COMMENTS SECTION */}
          <div className="my-8">
            {/* Recent comments or testimonials */}
            <h2 className="text-2xl font-semibold mb-4">Recent Comments</h2>
            {/* Display recent comments or testimonials here */}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LandingPage;
