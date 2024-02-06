import React, { useState } from "react";
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
    if (!searchSymbol) {
      console.log("enter something");
    } else {
      if (currentWebSocket) {
        currentWebSocket.close();
      }
      const ws = subscribeToSymbol(searchSymbol, (data: BinanceTradeUpdate) => {
        setLatestTrade(data);
      });
      setCurrentWebSocket(ws);

      return () => {
        if (currentWebSocket) {
          currentWebSocket.close();
          setCurrentWebSocket(null);
        }
      };
    }
  };

  return (
    <div className="w-full bg-secondary-bg mt-2 border border-border rounded-lg ">
      <div className="  ">
        <div className="flex flex-col items-center ">
          <InputComponent
            inputLabel="Search Symbol"
            inputType="string"
            onChange={handleSearchChange}
            placeholder="BTCUSDT"
          />
          <Button onClick={handleSymbolSearch} className="w-1/ m-4">
            Search
          </Button>
        </div>
      </div>

      <div className="">
        {latestTrade && (
          <div className="p-4 flex justify-between align-center items-center">
            <div>
              <div className="flex flex-col">
                <p className="text-secondary-foreground text-sm">Symbol:</p>
                <p> {latestTrade.s}</p>
              </div>
              <div className="flex flex-col">
                {latestTrade.p !== undefined && (
                  <>
                    <p className="text-secondary-foreground text-sm">Price:</p>
                    <p>{formatPrice(latestTrade.p)}</p>
                  </>
                )}
              </div>
              
            </div>
            <div className="pt-4 flex flex-col align-center items-center justify-center pb-4 gap-2">
              <BuyButton
                symbolName={latestTrade.s}
                symbolPrice={latestTrade.p}
                btnTitle="Buy"
              />
              <Link
                to={`https://www.tradingview.com/chart/0VfM6SX8/?symbol=BINANCE%3A${searchSymbol}`}
                target="_blank"
                className=""
              >
                <button>See Chart</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymbolSearch;
