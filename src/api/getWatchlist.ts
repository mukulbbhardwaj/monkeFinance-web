import apiClient from "../lib/api";

export interface WatchlistItem {
  id: number;
  userId?: number;
  symbolName: string;
  createdAt: string;
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  lastUpdate: string;
}

const getWatchlist = async (): Promise<WatchlistItem[]> => {
  try {
    const res = await apiClient.get("/api/watchlist");
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to fetch watchlist");
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

export default getWatchlist;

