// testData.ts

export interface PortfolioEntry {
  symbol: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  currentValue: number;
  Percentage: number;
}

export const testData: PortfolioEntry[] = [
  {
    symbol: "TATAPOWER",
    qty: 10,
    avgPrice: 25.0,
    ltp: 23.54,
    currentValue: 28.4,

    Percentage: -21.32,
  },
  {
    symbol: "INV002",
    qty: 15,
    avgPrice: 30.0,
    ltp: 28.12,
    currentValue: 421.8,
    Percentage: 12.45,
  },
  {
    symbol: "INV003",
    qty: 8,
    avgPrice: 18.5,
    ltp: 20.75,
    currentValue: 166,
    Percentage: 8.91,
  },
  {
    symbol: "INV004",
    qty: 20,
    avgPrice: 40.0,
    ltp: 42.36,
    currentValue: 847.2,
    Percentage: 27.15,
  },
  {
    symbol: "INV005",
    qty: 12,
    avgPrice: 15.0,
    ltp: 14.28,
    currentValue: 171.36,
    Percentage: -28.57,
  },
];
