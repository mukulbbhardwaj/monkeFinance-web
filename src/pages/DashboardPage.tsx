import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import useStore from "@/store/userStore";
import PortfolioQuickView from "@/components/dashboardComponents/PortfolioQuickView";
import HoldingsItem from "@/components/dashboardComponents/HoldingsItem";
import SymbolSearch from "@/components/dashboardComponents/SymbolSearch";
import TransactionsSection from "@/components/dashboardComponents/TransactionsSection";
import WatchlistSection from "@/components/dashboardComponents/WatchlistSection";
import getPortfolioInfo from "@/api/getPortfolioInfo";
import { Loader2 } from "lucide-react";

interface DashboardPageProps {}

type SymbolOwned = {
  averagePrice: number;
  portfolioId: number;
  quantity: number;
  symbolName: string;
};

type HoldingBreakdown = {
  symbolName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  currentValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
};

type PortfolioData = {
  portfolioId: number;
  symbolsOwned: SymbolOwned[];
  totalAmount: number;
  initialAmount: number;
  currentValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  userId: number;
  breakdown?: {
    cash: number;
    holdings: HoldingBreakdown[];
    totalHoldingsValue: number;
  };
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

        if (userStore.user) {
          const data = await getPortfolioInfo();
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

    if (userStore.user) {
      fetchPortfolioData();
    }
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
      <div className="flex flex-col mt-8 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Portfolio and Search */}
          <div className="lg:col-span-2 space-y-6">
            <PortfolioQuickView
              currentValue={portfolioInfo?.currentValue || 0}
              totalAmount={portfolioInfo?.totalAmount || 0}
              initialAmount={portfolioInfo?.initialAmount || 0}
              totalReturn={portfolioInfo?.totalReturn || 0}
              totalReturnPercent={portfolioInfo?.totalReturnPercent || 0}
            />
            
            <SymbolSearch />
            
            <TransactionsSection />
          </div>
          
          {/* Right Column - Holdings and Watchlist */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-4">Your Holdings</h1>
              {portfolioInfo?.breakdown?.holdings && portfolioInfo.breakdown.holdings.length > 0 ? (
                <div className="space-y-3">
                  {portfolioInfo.breakdown.holdings.map((holding) => (
                    <HoldingsItem
                      key={holding.symbolName}
                      symbolName={holding.symbolName}
                      avgBuyPrice={holding.averagePrice}
                      quantity={holding.quantity}
                      currentPrice={holding.currentPrice}
                      unrealizedPnL={holding.unrealizedPnL}
                      unrealizedPnLPercent={holding.unrealizedPnLPercent}
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
            
            <WatchlistSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
