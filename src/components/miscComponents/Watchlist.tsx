import { FC } from "react";
import { symbols } from "../test-data/watchlistSymbols";

interface WatchlistProps {}

const Watchlist: FC<WatchlistProps> = () => {
  return (
    <div className="bg-secondary-bg border border-border rounded-lg p-6">
      <h1 className="text-xl font-semibold mb-4">Watchlist</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 text-muted-foreground">Symbol</th>
              <th className="text-right p-2 text-muted-foreground">LTP</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map((sym) => (
              <tr key={sym} className="border-b border-border hover:bg-card-hovered transition-colors">
                <td className="p-2">{sym}</td>
                <td className="p-2 text-right">LTP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
