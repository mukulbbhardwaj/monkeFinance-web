import apiClient from "../lib/api";

export interface Transaction {
  id: number;
  userId: number;
  symbolName: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  totalAmount: number;
  createdAt: string;
  isArchived: boolean;
  archivedAt: string | null;
}

const getTransactions = async (limit: number = 50, includeArchived: boolean = false): Promise<Transaction[]> => {
  try {
    const res = await apiClient.get(
      `/api/portfolio/transactions?limit=${limit}&includeArchived=${includeArchived}`
    );
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to fetch transactions");
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export default getTransactions;

