const binanceWebSocketUrl = "wss://stream.binance.com:9443/ws/";

interface BinanceTradeUpdate {
  s: string; // Symbol
  p: number; // Price

}

const subscribeToSymbol = (symbol: string, onMessageCallback: (data: BinanceTradeUpdate) => void) => {
  const ws = new WebSocket(`${binanceWebSocketUrl}${symbol.toLowerCase()}@trade`);

  ws.onopen = () => {
    console.log(`WebSocket connection opened for symbol ${symbol}`);
  };

  ws.onmessage = (event) => {
    const data: BinanceTradeUpdate = JSON.parse(event.data);
    onMessageCallback(data);
  };

  ws.onerror = (error) => {
    console.error(`WebSocket error for symbol ${symbol}:`, error);
  };

  ws.onclose = () => {
    console.log(`WebSocket connection closed for symbol ${symbol}`);
  };

  return ws;
};

export { subscribeToSymbol };

