import { calculateInvestedAmount, formatPrice } from "@/lib/utils";

import { FC } from "react";
import InfoToolTip from "../miscComponents/InfoToolTip";

interface SymbolOwned {
  averagePrice: number;
  portfolioId: number;
  quantity: number;
  symbolName: string;
}

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
  const investedAmount = calculateInvestedAmount(symbols);
  // const currentValue = calculateCurrentValue(symbols);

  return (
   
    <div className="flex justify-center flex-col border border-border rounded-lg w-full bg-secondary-bg p-4">
      <h1 className="text-sm">Your Portfolio</h1>
      <div className="flex justify-between m-4 ">
        <div className="flex flex-col lg:w-64">
          <div className="lg:p-4">
            <h1 className="text-secondary-foreground text-sm flex gap-1 items-center ">
              Current
              <InfoToolTip description="Current Amount in Your Account" />
            </h1>
            <h2 className="text-heading text-lg">
              ₹{formatPrice(totalAmount)}
              {/* {currentValue} */}
            </h2>
          </div>
          <div className="lg:p-4">
            <h1 className="text-secondary-foreground text-sm flex gap-1 items-center">
              Invested{" "}
              <InfoToolTip description="Total Amount Invested in the Market" />
            </h1>
            <h2 className="text-heading text-lg">
              ₹{formatPrice(investedAmount)}
            </h2>
          </div>
        </div>
        {/* <div className="lg:p-4">
          <h1 className="text-secondary-foreground text-sm flex items-center gap-1">
            Total Returns{" "}
            <InfoToolTip description="Total Returns on Invested Amount" />
          </h1>
          <h2 className="text-green text-lg">₹{totalReturns}</h2>
        </div> */}
      </div>
    </div>
  );
};

export default PortfolioQuickView;
