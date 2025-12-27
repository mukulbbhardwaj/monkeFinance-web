import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import useStore from "@/store/userStore";
import PortfolioQuickView from "@/components/dashboardComponents/PortfolioQuickView";
import HoldingsItem from "@/components/dashboardComponents/HoldingsItem";
import SymbolSearch from "@/components/dashboardComponents/SymbolSearch";
import getPortfolioInfo from "@/api/getPortfolioInfo";
import { Loader2 } from "lucide-react";

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
  const userStore = useStore();
  const [portfolioInfo, setPortfolioInfo] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to get user from store first
        let userId = userStore.user?.id;
        
        // Fallback to localStorage if store doesn't have user
        if (!userId) {
          const userString = localStorage.getItem("User");
          if (userString) {
            try {
              const user = JSON.parse(userString);
              userId = user?.state?.user?.id;
            } catch (parseError) {
              console.error("Failed to parse user from localStorage:", parseError);
            }
          }
        }

        if (userId) {
          const data = await getPortfolioInfo(userId);
          setPortfolioInfo(data);
        } else {
          setError("User not found. Please log in.");
        }
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError("Failed to load portfolio data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [userStore.user?.id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col mt-8 gap-6 lg:flex-row lg:justify-around lg:items-start">
        <div className="flex-1 max-w-2xl">
          <div className="border border-border rounded-lg p-4 mb-6 bg-card">
            <h2 className="text-lg font-semibold mb-1">
              Welcome back, {userStore.user?.username || "User"}!
            </h2>
            <p className="text-sm text-muted-foreground">
              Here's your portfolio overview
            </p>
          </div>
          
          <PortfolioQuickView
            investedAmount={portfolioInfo?.totalAmount || 0}
            currentAmount={portfolioInfo?.totalAmount || 0}
            totalAmount={portfolioInfo?.totalAmount || 0}
            symbols={portfolioInfo?.symbolsOwned || []}
          />
          
          <div className="mt-6">
            <SymbolSearch />
          </div>
        </div>
        
        <div className="lg:w-96 lg:ml-8">
          <h1 className="text-2xl font-bold mb-4 p-4 lg:pt-0">Your Holdings</h1>
          {portfolioInfo?.symbolsOwned && portfolioInfo.symbolsOwned.length > 0 ? (
            <div className="space-y-3">
              {portfolioInfo.symbolsOwned.map((symbol) => (
                <HoldingsItem
                  key={symbol.symbolName}
                  symbolName={symbol.symbolName}
                  avgBuyPrice={symbol.averagePrice}
                  quantity={symbol.quantity}
                />
              ))}
            </div>
          ) : (
            <div className="border border-border rounded-lg p-8 text-center bg-card">
              <p className="text-muted-foreground">
                No holdings yet. Start by searching and buying a symbol!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
