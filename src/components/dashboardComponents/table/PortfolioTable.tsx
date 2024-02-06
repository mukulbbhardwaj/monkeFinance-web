// PortfolioTable.tsx

import { FC, Key } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../@/components/ui/table";
import { testData, PortfolioEntry } from "./test-data.ts";
import { getPNLInfo } from "@/lib/utils.ts";

interface PortfolioTableProps {}

const PortfolioTable: FC<PortfolioTableProps> = () => {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow className="bg-red p-4 ">
            <TableHead className="w-[100px]">Symbol</TableHead>
            <TableHead>Qty.</TableHead>
            <TableHead>Avg. Price</TableHead>
            <TableHead>LTP</TableHead>
            <TableHead>P&L</TableHead>
            <TableHead>P&L %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testData.map(
            (data: PortfolioEntry, index: Key | null | undefined) => {
              const pnlInfo = getPNLInfo(data.ltp, data.avgPrice, data.qty);

              return (
                <TableRow key={index} className="text-center">
                  <TableCell className="font-medium">{data.symbol}</TableCell>
                  <TableCell>{data.qty}</TableCell>
                  <TableCell>{data.avgPrice}</TableCell>
                  <TableCell>{data.ltp}</TableCell>
                  <TableCell className={pnlInfo.color}>
                    {pnlInfo.amount}
                  </TableCell>
                  <TableCell className={pnlInfo.color}>
                    {pnlInfo.percentage}%
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PortfolioTable;
