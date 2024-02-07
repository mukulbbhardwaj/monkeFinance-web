import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SymbolOwned {
  averagePrice: number;
  portfolioId: number;
  quantity: number;
  symbolName: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//
//
//
export const formatPrice = (
  num: number | string | undefined,
  isCurrency: boolean = false
): string => {
  if (num === undefined || isNaN(Number(num))) {
    return "N/A";
  }

  const numericValue: number =
    typeof num === "string" ? parseFloat(num) : Number(num);

  if (!isNaN(numericValue)) {
    if (isCurrency) {
      return numericValue.toFixed(2);
    } else {
      if (numericValue >= 1000000000) {
        return (numericValue / 1000000000).toFixed(2) + "B";
      } else if (numericValue >= 1000000) {
        return (numericValue / 1000000).toFixed(2) + "M";
      } else if (numericValue >= 1000) {
        return (numericValue / 1000).toFixed(2) + "K";
      } else {
        return numericValue.toFixed(2);
      }
    }
  }

  return "N/A";
};


//
//
//

export const calculateReturns = (
  avgBuyPrice: number,
  currentPrice: number,
  quantity: number
): number => {


  const totalInvestment = avgBuyPrice * quantity;
  const currentInvestmentValue = (currentPrice) * quantity;

  return (currentInvestmentValue - totalInvestment);
};

export const calculateTotalInvested = () => {};

export const calculateInvestedAmount = (
  symbolInfo: SymbolOwned[] | undefined
): number => {
  if (symbolInfo === undefined || symbolInfo.length === 0) {
    return NaN; // Return undefined if symbolInfo is undefined or empty
  }
  let totalInvestedAmount = 0;
  symbolInfo.forEach(({ averagePrice, quantity }) => {
    totalInvestedAmount += averagePrice * quantity;
  });
  return totalInvestedAmount ;
};
