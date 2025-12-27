import { FC, useEffect, useState } from "react";
import getWatchlist, { type WatchlistItem } from "@/api/getWatchlist";
import apiClient from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Loader2, X, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface WatchlistSectionProps {}

const WatchlistSection: FC<WatchlistSectionProps> = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemoveFromWatchlist = async (symbolName: string) => {
    try {
      const response = await apiClient.delete("/api/watchlist", {
        data: { symbolName },
      });

      if (response.data.success) {
        toast.success(`${symbolName} removed from watchlist`);
        setWatchlist((prev) =>
          prev.filter((item) => item.symbolName !== symbolName)
        );
      } else {
        toast.error(response.data.message || "Failed to remove from watchlist");
      }
    } catch (error: any) {
      console.error("Error removing from watchlist:", error);
      toast.error(
        error.response?.data?.message || "Failed to remove from watchlist"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
        <div className="text-center py-8">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="space-y-3">
          {watchlist.map((item) => {
            const isPositive = item.changePercent24h >= 0;
            const changeColor = isPositive ? "text-profit" : "text-loss";
            const changeBgColor = isPositive ? "bg-profit/10" : "bg-loss/10";
            
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-card-hovered transition-colors"
              >
                {/* First Line: Symbol and Price */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg">{item.symbolName}</h3>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md ${changeBgColor}`}>
                        {isPositive ? (
                          <TrendingUp className="h-3.5 w-3.5 text-profit" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 text-loss" />
                        )}
                        <span className={`text-sm font-semibold ${changeColor}`}>
                          {isPositive ? '+' : ''}{item.changePercent24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">₹{formatPrice(item.price)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromWatchlist(item.symbolName)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Second Line: Change Amount, High, Low */}
                  <div className="flex items-center justify-between text-sm">
                    <div className={`flex items-center gap-1 ${changeColor}`}>
                      <span className="font-medium">
                        {isPositive ? '+' : ''}₹{formatPrice(Math.abs(item.change24h))}
                      </span>
                      <span className="text-muted-foreground">24h</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">High:</span>
                        <span className="font-medium text-foreground">₹{formatPrice(item.high24h)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">Low:</span>
                        <span className="font-medium text-foreground">₹{formatPrice(item.low24h)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Your watchlist is empty. Add symbols to track their prices!
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchlistSection;

