import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import PortfolioQuickView from "@/components/dashboardComponents/PortfolioQuickView";
import SymbolInfo from "@/components/dashboardComponents/HoldingsItem";
import useStore from "@/store/userStore";
import SymbolSearch from "@/components/dashboardComponents/SymbolSearch";
import getPortfolioInfo from "@/api/getPortfolioInfo";

interface DashboardPageProps {}

type SymbolOwned = {
  averagePrice: number;
  portfolioId: number;
  quantity: number;
  symbolName: string;
};

type PortfolioData = {
  portfolioId: number;
  symbolsOwned: SymbolOwned[];
  totalAmount: number;
  userId: number;
};

const DashboardPage: FC<DashboardPageProps> = () => {
  const userdata = useStore();
  const [portfolioInfo, setPortfolioInfo] = useState<PortfolioData>();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const data: PortfolioData = await getPortfolioInfo(userdata.user?.id);
      setPortfolioInfo(data);
    };
    if (userdata.user) {
      fetchPortfolioData();
    }
  }, [userdata.user]);
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('User'));
    const userString = localStorage.getItem("User");

    if (userString !== null) {
      const user = JSON.parse(userString);
      // Now you can use the 'user' object
      const fetchPortfolioData = async () => {
        const data: PortfolioData = await getPortfolioInfo(
          user?.state?.user?.id
        );
        setPortfolioInfo(data);
      };
      if (user?.state?.user?.id) {
        fetchPortfolioData();
      }
    } else {
      // Handle the case when 'User' key is not present in localStorage
      console.error("User key not found in localStorage");
    }   
   }, []);

  return (
    <>
      <Layout>
        <div className="flex flex-col mt-8 lg:flex-row  lg:justify-around lg:align-top lg:items-start ">
          <div className="">
            <PortfolioQuickView
              investedAmount={portfolioInfo?.totalAmount || 0}
              currentAmount={12400}
              totalAmount={portfolioInfo?.totalAmount || 0}
              symbols={portfolioInfo?.symbolsOwned || []}
            />
            <SymbolSearch />
          </div>
          <div className="lg:w-96 lg:ml-8 ">
            <h1 className="p-4 lg:pt-0">Your holdings</h1>
            {portfolioInfo?.symbolsOwned.map((symbol) => {
              return (
                <div key={symbol.symbolName}>
                  <SymbolInfo
                    symbolName={symbol.symbolName}
                    avgBuyPrice={symbol.averagePrice}
                    quantity={symbol.quantity}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* <LatestNewsSection/> */}
      </Layout>
    </>
  );
};

export default DashboardPage;
