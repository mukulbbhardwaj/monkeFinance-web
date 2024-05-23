import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import useStore from "@/store/userStore";
import PortfolioQuickView from "@/components/dashboardComponents/PortfolioQuickView";
import SymbolInfo from "@/components/dashboardComponents/HoldingsItem";
import SymbolSearch from "@/components/dashboardComponents/SymbolSearch";
import getPortfolioInfo from "@/api/getPortfolioInfo";
// import { Construction } from "lucide-react";

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
  }, [userdata.user,portfolioInfo]);

  useEffect(() => {
    const userString = localStorage.getItem("User");

    if (userString !== null) {
      const user = JSON.parse(userString);
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
      console.error("User key not found in localStorage");
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col mt-8 lg:flex-row  lg:justify-around lg:align-top lg:items-start ">
          <div className="">
            <p className="border mb-4 w-full rounded-lg p-4">
              Hello
            <p >{userdata.user?.username}</p>
            </p>
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
      {/* <div className="text-4xl flex justify-center items-center gap-4">
        <Construction size={64} color="red" /> Under Maintenance
      </div>
      <p className="text-sm text-center">:) This feature will be back soon...</p> */}
    </Layout>
  );
};

export default DashboardPage;
