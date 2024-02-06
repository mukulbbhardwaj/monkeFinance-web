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
import axios from "axios";
import useStore from "@/store/userStore";

interface SellButtonProps {
  symbolName: string;
  symbolPrice: number;
  currentPrice: number;
  quantity: number;
}

const SellButton: FC<SellButtonProps> = ({
  symbolName,
  symbolPrice,
  quantity,
}) => {
  const [sellQuantity, setSellQuantity] = useState<number>(0);
  const userStore = useStore();
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setSellQuantity(isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity);
  };
  const estimatedPrice =
    symbolPrice !== undefined ? symbolPrice * sellQuantity : 0;
  const handleBuyFunction = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/pt/sellSymbol", {
        userId: userStore.user?.id,
        symbolName: symbolName,
        quantity: sellQuantity,
        averagePrice: parseFloat(symbolPrice as unknown as string),
      });
      console.log(res);
    } catch (error: unknown) {
      console.error("ERROR:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>Sell</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Fill the data </DialogTitle>
        </DialogHeader>
        <div className="py-4 ">
          <div className="items-center">
            <p>Symbol : {symbolName}</p>
            {symbolPrice !== null && <p>Current Price : {symbolPrice}</p>}
            <p>Quantity Availbale to trade : {quantity}</p>
          </div>
          <div className="items-center">
            <Label htmlFor="qty" className="text-right">
              Quantity to sell:
            </Label>
            <Input
              type="text"
              id="qty"
              className=""
              value={sellQuantity}
              onChange={handleQuantityChange}
            />
          </div>
          <p>Estimated Price : {estimatedPrice}</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBuyFunction}>
            Sell
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SellButton;
