import { calculateInvestedAmount, formatPrice, type SymbolOwned } from "@/lib/utils";
import { FC, useMemo } from "react";
import InfoToolTip from "../miscComponents/InfoToolTip";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface PortfolioQuickViewProps {
  currentAmount: number;
  investedAmount: number;
  symbols: SymbolOwned[] | undefined;
  totalAmount: number;
}

const PortfolioQuickView: FC<PortfolioQuickViewProps> = ({
  symbols,
  totalAmount,
}) => {
  const investedAmount = useMemo(() => calculateInvestedAmount(symbols), [symbols]);
  const totalReturns = totalAmount - investedAmount;
  const returnPercentage = investedAmount > 0 
    ? ((totalReturns / investedAmount) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="flex flex-col border border-border rounded-lg w-full bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-semibold">Your Portfolio</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm text-muted-foreground flex items-center gap-1">
              Current Balance
              <InfoToolTip description="Current Amount in Your Account" />
            </h2>
          </div>
          <p className="text-2xl font-bold">
            ₹{formatPrice(totalAmount)}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm text-muted-foreground flex items-center gap-1">
              Invested
              <InfoToolTip description="Total Amount Invested in the Market" />
            </h2>
          </div>
          <p className="text-2xl font-bold">
            ₹{formatPrice(investedAmount)}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm text-muted-foreground flex items-center gap-1">
              Total Returns
              <InfoToolTip description="Total Returns on Invested Amount" />
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {totalReturns >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <div>
              <p className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ₹{formatPrice(Math.abs(totalReturns))}
              </p>
              <p className={`text-xs ${totalReturns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalReturns >= 0 ? '+' : ''}{returnPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioQuickView;
