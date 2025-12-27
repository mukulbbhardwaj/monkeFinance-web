import apiClient from "../lib/api";

const getPortfolioInfo = async () => {
  try {
    const res = await apiClient.get("/api/portfolio");
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to fetch portfolio");
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw error;
  }
};

export default getPortfolioInfo;
