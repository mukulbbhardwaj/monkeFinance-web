/* eslint-disable @typescript-eslint/no-explicit-any */
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
import axios from "axios";
import useStore from "@/store/userStore";
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
  quantity,
}) => {
  const [inputQuantity, setInputQuantity] = useState<number>(0);
  const userStore = useStore();
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setInputQuantity(isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity);
  };
  const estimatedPrice =
    symbolPrice !== undefined ? symbolPrice * inputQuantity : 0;
  const handleBuyFunction = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/pt/addSymbol`, {
        userId: userStore.user?.id,
        symbolName: symbolName,
        quantity: inputQuantity,
        averagePrice: parseFloat(symbolPrice as unknown as string),
      });
      toast.success("Transfer Success : Buy");
    } catch (error: any) {
      console.error("ERROR:", error);
      toast.error(`${error?.response.data.message}`)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
