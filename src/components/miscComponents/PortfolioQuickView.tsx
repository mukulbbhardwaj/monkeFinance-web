import { FC } from "react";

interface PortfolioQuickViewProps {
  currentAmount: number;
  investedAmount: number;
}

const PortfolioQuickView: FC<PortfolioQuickViewProps> = ({
  currentAmount,
  investedAmount,
}) => {
  const totalReturns = investedAmount - currentAmount;
  return (
    <div>
      <div className="p-4 w-80 bg-secondary-bg rounded-2xl">
        <h1 className="text-heading text-xs font-bold p-2">Your Portfolio</h1>
        <div className="flex flex-col p-4">
          <div className="flex justify-between">
            <div className="p-2">
              <h2 className="text-sub-heading font-extrabold text-sm">
                Current
              </h2>
              <span className="text-text text-lg font-bold">
                ₹{currentAmount}
              </span>
            </div>
            <div className="p-2">
              <h2 className="text-sub-heading font-extrabold text-sm text-right ">
                Total returns
              </h2>
              <span className="text-green text-lg font-bold ">
                ₹{totalReturns}(+12.43%)
              </span>
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="p-2">
              <h2 className="text-sub-heading font-extrabold text-sm  ">
                Invested
              </h2>
              <span className="text-text text-lg font-bold">
                ₹{investedAmount}
              </span>
            </div>
            <div className="p-2">
              <button className="text-text">Full Info ↗</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioQuickView;
