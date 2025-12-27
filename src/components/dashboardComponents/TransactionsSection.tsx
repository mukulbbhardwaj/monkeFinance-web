import { FC, useEffect, useState } from "react";
import getTransactions, { type Transaction } from "@/api/getTransactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface TransactionsSectionProps {}

const TransactionsSection: FC<TransactionsSectionProps> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTransactions(20, false);
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="text-center py-8">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow 
                  key={transaction.id}
                  className={transaction.type === "BUY" ? "hover:bg-buy/5" : "hover:bg-sell/5"}
                >
                  <TableCell>
                    <span
                      className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase ${
                        transaction.type === "BUY"
                          ? "bg-buy/20 text-buy border border-buy/30"
                          : "bg-sell/20 text-sell border border-sell/30"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {transaction.symbolName}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {transaction.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{formatPrice(transaction.price)}
                  </TableCell>
                  <TableCell 
                    className={`text-right font-bold ${
                      transaction.type === "BUY" 
                        ? "text-buy" 
                        : "text-sell"
                    }`}
                  >
                    {transaction.type === "BUY" ? "-" : "+"}₹{formatPrice(transaction.totalAmount)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(transaction.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No transactions yet. Start trading to see your history!
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionsSection;

