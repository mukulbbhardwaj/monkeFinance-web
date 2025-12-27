import React, { useState, useEffect } from "react";
import { subscribeToSymbol } from "../../api/binance";
import { Link } from "react-router-dom";
import BuyButton from "./BuyButton";
import InputComponent from "../miscComponents/InputComponent";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";

interface BinanceTradeUpdate {
  s: string;
  p: number;
}

const SymbolSearch = () => {
  const [latestTrade, setLatestTrade] = useState<BinanceTradeUpdate | null>(
    null
  );
  const [searchSymbol, setSearchSymbol] = useState<string>("");
  const [currentWebSocket, setCurrentWebSocket] = useState<WebSocket | null>(
    null
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSymbol(event.target.value);
  };
  const handleSymbolSearch = () => {
    if (!searchSymbol.trim()) {
      return;
    }
    
    if (currentWebSocket) {
      currentWebSocket.close();
    }
    
    const ws = subscribeToSymbol(searchSymbol.toUpperCase(), (data: BinanceTradeUpdate) => {
      setLatestTrade(data);
    });
    setCurrentWebSocket(ws);
  };

  useEffect(() => {
    return () => {
      if (currentWebSocket) {
        currentWebSocket.close();
      }
    };
  }, [currentWebSocket]);

  return (
    <div className="w-full bg-card mt-2 border border-border rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Search Symbol</h2>
        <div className="flex flex-col gap-4">
          <InputComponent
            inputLabel="Symbol"
            inputType="text"
            onChange={handleSearchChange}
            placeholder="BTCUSDT"
          />
          <Button 
            onClick={handleSymbolSearch} 
            className="w-full"
            disabled={!searchSymbol.trim()}
          >
            Search
          </Button>
        </div>
      </div>

      {latestTrade && (
        <div className="border-t border-border p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Symbol</p>
                <p className="text-lg font-semibold">{latestTrade.s}</p>
              </div>
              {latestTrade.p !== undefined && (
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="text-xl font-bold">₹{formatPrice(latestTrade.p)}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <BuyButton
                symbolName={latestTrade.s}
                symbolPrice={latestTrade.p}
                btnTitle="Buy"
              />
              <Link
                to={`https://www.tradingview.com/chart/0VfM6SX8/?symbol=BINANCE%3A${searchSymbol.toUpperCase()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  View Chart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymbolSearch;
