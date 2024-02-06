// api/news.ts

interface NewsItem {
  title: string;
  description: string;
}

const getNews = async (): Promise<NewsItem[]> => {
  const apiUrl = import.meta.env.VITE_NEWS_API_URL;
  const localStorageKey = "newsData";
  try {
    const storedData = localStorage.getItem(localStorageKey);
    const storedTimestamp = localStorage.getItem(
      `${localStorageKey}_timestamp`
    );
    if (storedData && storedTimestamp) {
      const currentTime = new Date().getTime();
      const storedTime = parseInt(storedTimestamp, 10);
      const timeDifference = currentTime - storedTime;
      const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (timeDifference < cacheDuration) {
        return JSON.parse(storedData);
      }
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    localStorage.setItem(
      `${localStorageKey}_timestamp`,
      new Date().getTime().toString()
    );
    if (!response.ok) {
      throw new Error(`Error fetching news data: ${response.status}`);
    }
    return data as NewsItem[];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export { getNews };
