import { FC, useEffect, useState } from "react";
import SymbolInfo from "./SymbolInfo";
import { subscribeToSymbol } from "@/api/binance";
import { calculateReturns, formatPrice } from "@/lib/utils";

interface SymbolInfoProps {
  symbolName: string;
  avgBuyPrice: number;
  quantity: number;
}

const HoldingsItem: FC<SymbolInfoProps> = ({
  symbolName,
  avgBuyPrice,
  quantity,
}) => {
  const [currentPrice, setCurrentPrice] = useState<number>();

  useEffect(() => {
    const ws = subscribeToSymbol(symbolName, (data) => {
      setCurrentPrice(data.p as number);
    });
    return () => {
      ws.close();
    };
  }, [symbolName]);

  const returns = calculateReturns(avgBuyPrice, currentPrice, quantity);

  return (
    <div className="flex border justify-between p-4 rounded-md mb-4 items-center ">
      <div className=" flex flex-col">
        <SymbolInfo
          symbolName={symbolName}
          quantity={quantity}
          avgBuyPrice={avgBuyPrice}
          currentPrice={formatPrice(currentPrice)}
          returns={returns}
        >
          <p>{symbolName}</p>
        </SymbolInfo>
        <p className="text-xs text-secondary-foreground">{quantity} units</p>
      </div>
      <div className="flex flex-col items-center">
        <p>₹{avgBuyPrice}</p>
        <p className="text-xs ">({formatPrice(returns)})</p>
      </div>
    </div>
  );
};

export default HoldingsItem;
