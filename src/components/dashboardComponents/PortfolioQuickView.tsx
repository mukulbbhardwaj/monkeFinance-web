import { formatPrice } from "@/lib/utils";
import { FC } from "react";
import InfoToolTip from "../miscComponents/InfoToolTip";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface PortfolioQuickViewProps {
  currentValue: number;
  totalAmount: number;
  initialAmount: number;
  totalReturn: number;
  totalReturnPercent: number;
}

const PortfolioQuickView: FC<PortfolioQuickViewProps> = ({
  currentValue,
  totalAmount,
  totalReturn,
  totalReturnPercent,
}) => {

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
              Current Value
              <InfoToolTip description="Total Portfolio Value (Cash + Holdings)" />
            </h2>
          </div>
          <p className="text-2xl font-bold">
            ₹{formatPrice(currentValue)}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm text-muted-foreground flex items-center gap-1">
              Cash Available
              <InfoToolTip description="Available Cash in Your Account" />
            </h2>
          </div>
          <p className="text-2xl font-bold">
            ₹{formatPrice(totalAmount)}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm text-muted-foreground flex items-center gap-1">
              Total Returns
              <InfoToolTip description="Total Returns on Initial Investment" />
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {totalReturn >= 0 ? (
              <TrendingUp className="h-5 w-5 text-profit" />
            ) : (
              <TrendingDown className="h-5 w-5 text-loss" />
            )}
            <div>
              <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-profit' : 'text-loss'}`}>
                {totalReturn >= 0 ? '+' : ''}₹{formatPrice(Math.abs(totalReturn))}
              </p>
              <p className={`text-xs font-semibold ${totalReturn >= 0 ? 'text-profit' : 'text-loss'}`}>
                {totalReturn >= 0 ? '+' : ''}{totalReturnPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioQuickView;
