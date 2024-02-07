import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import PortfolioQuickView from "@/components/dashboardComponents/PortfolioQuickView";
import SymbolInfo from "@/components/dashboardComponents/HoldingsItem";
import useStore from "@/store/userStore";
import SymbolSearch from "@/components/dashboardComponents/SymbolSearch";
import getPortfolioInfo from "@/api/getPortfolioInfo";
// import { subscribeToSymbol } from "@/api/binance";
// import { calculateReturns } from "@/lib/utils";

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
      console.log(portfolioInfo);
    };
    if (userdata.user) {
      fetchPortfolioData();
    }
  }, [userdata.user]);


  const [loading, setLoading] = useState(true);
   useEffect(() => {
     const timer = setTimeout(() => {
       setLoading(false);
     }, 5000);

     return () => clearTimeout(timer); // Cleanup the timer on component unmount
   }, []);

  return (
    <>
      <Layout>
        <div className="flex flex-col mt-8 lg:flex-row  lg:justify-around lg:align-top lg:items-start ">
          <div className="">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <PortfolioQuickView
                investedAmount={portfolioInfo?.totalAmount || 0}
                currentAmount={12400}
                totalAmount={portfolioInfo?.totalAmount || 0}
                symbols={portfolioInfo?.symbolsOwned || []}
              />
            )}
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
