import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SymbolOwned {
  averagePrice: number;
  portfolioId: number;
  quantity: number;
  symbolName: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (
  num: number,
  isCurrency: boolean = false
): string => {
  if (num === undefined || isNaN(Number(num))) {
    return "N/A";
  }
  
  const numericValue: number =
    typeof num === "string" ? parseFloat(num) : Number(num);

  if (isNaN(numericValue)) {
    return "N/A";
  }

  if (isCurrency) {
    return numericValue.toFixed(2);
  }
  
  if (numericValue >= 1000000000) {
    return (numericValue / 1000000000).toFixed(2) + "B";
  } else if (numericValue >= 1000000) {
    return (numericValue / 1000000).toFixed(2) + "M";
  } else if (numericValue >= 1000) {
    return (numericValue / 1000).toFixed(2) + "K";
  }
  
  return numericValue.toFixed(2);
};

export const calculateReturns = (
  avgBuyPrice: number,
  currentPrice: number,
  quantity: number
): number => {
  if (!avgBuyPrice || !currentPrice || !quantity) {
    return 0;
  }
  
  const totalInvestment = avgBuyPrice * quantity;
  const currentInvestmentValue = currentPrice * quantity;

  return currentInvestmentValue - totalInvestment;
};

export const calculateInvestedAmount = (
  symbolInfo: SymbolOwned[] | undefined
): number => {
  if (!symbolInfo || symbolInfo.length === 0) {
    return 0;
  }
  
  return symbolInfo.reduce((total, { averagePrice, quantity }) => {
    return total + averagePrice * quantity;
  }, 0);
};


