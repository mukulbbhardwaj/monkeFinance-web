import { FC, useEffect, useState } from "react";
import SymbolInfo from "./SymbolInfo";
import { subscribeToSymbol } from "@/api/binance";
import { calculateReturns, formatPrice } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface HoldingsItemProps {
  symbolName: string;
  avgBuyPrice: number;
  quantity: number;
}

const HoldingsItem: FC<HoldingsItemProps> = ({
  symbolName,
  avgBuyPrice,
  quantity,
}) => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const ws = subscribeToSymbol(symbolName, (data) => {
      setCurrentPrice(data.p as number);
      setIsLoading(false);
    });
    
    return () => {
      ws.close();
    };
  }, [symbolName]);

  const returns = calculateReturns(avgBuyPrice, currentPrice, quantity);
  const returnPercentage = avgBuyPrice > 0 
    ? (((currentPrice - avgBuyPrice) / avgBuyPrice) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="flex border border-border justify-between p-4 rounded-lg bg-card hover:bg-card-hovered transition-colors items-center shadow-sm">
      <div className="flex flex-col flex-1">
        <SymbolInfo
          symbolName={symbolName}
          quantity={quantity}
          avgBuyPrice={avgBuyPrice}
          currentPrice={currentPrice}
          returns={returns}
        >
          <p className="font-semibold text-lg">{symbolName}</p>
        </SymbolInfo>
        <p className="text-xs text-muted-foreground mt-1">
          {quantity} units @ ₹{formatPrice(avgBuyPrice)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <>
            <p className="font-semibold">₹{formatPrice(currentPrice)}</p>
            <div className="flex items-center gap-1">
              {returns >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <p className={`text-xs font-medium ${returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {returns >= 0 ? '+' : ''}₹{formatPrice(Math.abs(returns))} ({returnPercentage}%)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HoldingsItem;
