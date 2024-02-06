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
import InputComponent from "../miscComponents/InputComponent";

interface BuyButtonProps {
  symbolName: string;
  symbolPrice: number;
  btnTitle: string;
  quantity?: number;
}

const BuyButton: FC<BuyButtonProps> = ({ symbolName, symbolPrice,btnTitle,quantity }) => {
  const [inputQuantity, setInputQuantity] = useState<number>(0);
  const userStore = useStore();
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setInputQuantity(isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity);
  };
  const estimatedPrice = symbolPrice !== undefined ? symbolPrice * inputQuantity : 0;
  const handleBuyFunction = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/pt/addSymbol", {
        userId: userStore.user?.id,
        symbolName: symbolName,
        quantity: quantity,
        // JUGAAD 
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
        <Button variant={"default"}>{btnTitle }</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black bg-slate-400">
        <DialogHeader>
          <DialogTitle>Fill the data </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="items-center gap-4">
            <p>Symbol: {symbolName}</p>
            {symbolPrice !== null && <p>Current Price: {symbolPrice}</p>}
            <p>Quantity:{quantity}</p>
          </div>
          <div className="w-1/2">
            <InputComponent
              inputLabel="Quantities to buy"
              inputType="number"
              placeholder=""
              onChange={handleQuantityChange}
            />
          </div>
          <p>Estimated Price : {estimatedPrice}</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBuyFunction}>
            Buy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyButton;
