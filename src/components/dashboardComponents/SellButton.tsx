import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api";
import { toast } from "react-toastify";

interface SellButtonProps {
  symbolName: string;
  symbolPrice: number;
  currentPrice: number;
  quantity: number;
}

const SellButton: FC<SellButtonProps> = ({
  symbolName,
  quantity,
  currentPrice,
}) => {
  const [sellQuantity, setSellQuantity] = useState<number>(0);

  // Ensure currentPrice is a number
  const safeCurrentPrice = typeof currentPrice === 'number' && !isNaN(currentPrice)
    ? currentPrice
    : 0;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseFloat(event.target.value);
    setSellQuantity(isNaN(newQuantity) || newQuantity <= 0 ? 0 : newQuantity);
  };

  const estimatedPrice =
    safeCurrentPrice > 0 ? safeCurrentPrice * sellQuantity : 0;

  const handleSellFunction = async () => {
    if (sellQuantity <= 0) {
      toast.warning("Please enter a valid quantity");
      return;
    }

    if (sellQuantity > quantity) {
      toast.error("Cannot sell more than you own");
      return;
    }

    try {
      const response = await apiClient.post("/api/portfolio/sell", {
        symbolName: symbolName,
        quantity: sellQuantity,
      });

      if (response.data.success) {
        toast.success("Symbol sold successfully!");
        setSellQuantity(0);
        // Refresh the page or trigger portfolio refresh
        window.location.reload();
      } else {
        toast.error(response.data.message || "Sale failed");
      }
    } catch (error: any) {
      console.error("ERROR:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to sell symbol";
      toast.error(errorMessage);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} className="bg-sell hover:bg-sell-hover text-sell-foreground">Sell</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Fill the data </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">Symbol: {symbolName}</p>
            {safeCurrentPrice > 0 ? (
              <p className="text-sm text-muted-foreground">
                Current Price: ₹{safeCurrentPrice.toFixed(2)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Loading price...</p>
            )}
            <p className="text-sm text-muted-foreground">
              Available to sell: {quantity} units
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qty">Quantity to sell:</Label>
            <Input
              type="number"
              id="qty"
              step="any"
              min="0"
              max={quantity}
              value={sellQuantity || ""}
              onChange={handleQuantityChange}
              placeholder="Enter quantity"
            />
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold">
              Estimated Revenue: ₹{estimatedPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSellFunction} className="bg-sell hover:bg-sell-hover text-sell-foreground">
            Sell
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SellButton;
