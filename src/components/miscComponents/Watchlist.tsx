import { FC } from "react";
import { symbols } from "../test-data/watchlistSymbols";

interface WatchlistProps {}

const Watchlist: FC<WatchlistProps> = () => {
  return (
    <div className="bg-secondary-bg">
      {/* {console.log(symbols)} */}
      <h1>Watchlist</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>symbol</th>
              <th>LTP</th>
            </tr>
          </thead>

          {symbols.map((sym) => (
            <tbody key={sym}>
              <td>{sym}</td>
              <td>LTP</td>
            </tbody>
          ))}
          <tr></tr>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
