import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api";
import InputComponent from "../miscComponents/InputComponent";
import { toast } from "react-toastify";

interface BuyButtonProps {
  symbolName: string;
  symbolPrice: number;
  btnTitle: string;
  quantity?: number;
}

const BuyButton: FC<BuyButtonProps> = ({
  symbolName,
  symbolPrice,
  btnTitle,
}) => {
  const [inputQuantity, setInputQuantity] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [buyByValue, setBuyByValue] = useState<boolean>(false);

  // Ensure symbolPrice is a number
  const safeSymbolPrice = typeof symbolPrice === 'number' && !isNaN(symbolPrice) 
    ? symbolPrice 
    : 0;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string, numbers, and decimal points
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputQuantity(value);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string, numbers, and decimal points
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const quantityNum = parseFloat(inputQuantity) || 0;
  const valueNum = parseFloat(inputValue) || 0;

  const estimatedPrice = buyByValue
    ? valueNum
    : safeSymbolPrice > 0
    ? safeSymbolPrice * quantityNum
    : 0;

  const handleBuyFunction = async () => {
    if (buyByValue && valueNum <= 0) {
      toast.warning("Please enter a valid amount to invest");
      return;
    }
    if (!buyByValue && quantityNum <= 0) {
      toast.warning("Please enter a valid quantity");
      return;
    }

    try {
      const requestBody = buyByValue
        ? {
            symbolName: symbolName,
            value: valueNum,
          }
        : {
            symbolName: symbolName,
            quantity: quantityNum,
          };

      const response = await apiClient.post("/api/portfolio/buy", requestBody);

      if (response.data.success) {
        toast.success("Symbol purchased successfully!");
        // Reset form
        setInputQuantity("");
        setInputValue("");
        // Refresh the page or trigger portfolio refresh
        window.location.reload();
      } else {
        toast.error(response.data.message || "Purchase failed");
      }
    } catch (error: any) {
      console.error("ERROR:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to purchase symbol";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} className="bg-buy hover:bg-buy-hover text-buy-foreground">{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fill the data </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">Symbol: {symbolName}</p>
            {safeSymbolPrice > 0 ? (
              <p className="text-sm text-muted-foreground">
                Current Price: ₹{safeSymbolPrice.toFixed(2)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Loading price...</p>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              variant={!buyByValue ? "default" : "outline"}
              onClick={() => setBuyByValue(false)}
              className="flex-1"
            >
              Buy by Quantity
            </Button>
            <Button
              variant={buyByValue ? "default" : "outline"}
              onClick={() => setBuyByValue(true)}
              className="flex-1"
            >
              Buy by Value
            </Button>
          </div>

          {buyByValue ? (
            <div>
              <InputComponent
                inputLabel="Amount to invest (₹)"
                inputType="number"
                placeholder="Enter amount"
                onChange={handleValueChange}
                value={inputValue}
                step="0.01"
                min="0"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Estimated Quantity:{" "}
                {safeSymbolPrice > 0 && valueNum > 0
                  ? (valueNum / safeSymbolPrice).toFixed(8)
                  : "0"}
              </p>
            </div>
          ) : (
            <div>
              <InputComponent
                inputLabel="Quantity to buy"
                inputType="number"
                placeholder="Enter quantity (e.g., 0.1)"
                onChange={handleQuantityChange}
                value={inputQuantity}
                step="any"
                min="0"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Supports decimal values (e.g., 0.1, 0.001)
              </p>
            </div>
          )}

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold">
              Estimated Cost: ₹{estimatedPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBuyFunction} className="bg-buy hover:bg-buy-hover text-buy-foreground">
            Buy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyButton;
