import { FC } from "react";
import SymbolInfo from "./SymbolInfo";
import { formatPrice } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface HoldingsItemProps {
  symbolName: string;
  avgBuyPrice: number;
  quantity: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
}

const HoldingsItem: FC<HoldingsItemProps> = ({
  symbolName,
  avgBuyPrice,
  quantity,
  currentPrice,
  unrealizedPnL,
  unrealizedPnLPercent,
}) => {

  const isProfit = unrealizedPnL >= 0;
  const profitColor = isProfit ? "text-profit" : "text-loss";
  const profitBgColor = isProfit ? "bg-profit/10 border-profit/20" : "bg-loss/10 border-loss/20";

  return (
    <div className={`flex border border-border justify-between p-4 rounded-lg bg-card hover:bg-card-hovered transition-colors items-center shadow-sm ${profitBgColor}`}>
      <div className="flex flex-col flex-1">
        <SymbolInfo
          symbolName={symbolName}
          quantity={quantity}
          avgBuyPrice={avgBuyPrice}
          currentPrice={currentPrice}
          returns={unrealizedPnL}
        >
          <p className="font-semibold text-lg">{symbolName}</p>
        </SymbolInfo>
        <p className="text-xs text-muted-foreground mt-1">
          {quantity} units @ ₹{formatPrice(avgBuyPrice)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="font-semibold">₹{formatPrice(currentPrice)}</p>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${profitBgColor}`}>
          {isProfit ? (
            <TrendingUp className="h-4 w-4 text-profit" />
          ) : (
            <TrendingDown className="h-4 w-4 text-loss" />
          )}
          <p className={`text-xs font-bold ${profitColor}`}>
            {isProfit ? '+' : ''}₹{formatPrice(Math.abs(unrealizedPnL))} ({isProfit ? '+' : ''}{unrealizedPnLPercent.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoldingsItem;
