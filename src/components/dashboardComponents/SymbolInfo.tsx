import { FC, ReactElement } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { XCircle } from "lucide-react";
import SellButton from "./SellButton";
import BuyButton from "./BuyButton";

interface SymbolInfoProps {
  children: ReactElement;
  symbolName: string;
  avgBuyPrice: number;
  quantity: number;
  currentPrice: number;
  returns: number | string | undefined;
}

const SymbolInfo: FC<SymbolInfoProps> = ({
  children,
  symbolName,
  avgBuyPrice,
  quantity,
  currentPrice,
  returns,
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="cursor-pointer">{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left space-y-4">
          <DrawerTitle className="text-2xl font-bold text-center">{symbolName}</DrawerTitle>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="text-lg font-semibold">{quantity} units</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Average Buying Price</p>
              <p className="text-lg font-semibold">₹{avgBuyPrice.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-lg font-semibold">₹{currentPrice.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Returns</p>
              <p className={`text-lg font-semibold ${typeof returns === 'number' && returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ₹{typeof returns === 'number' ? returns.toFixed(2) : returns}
              </p>
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter className="gap-4">
          <div className="flex w-full gap-4">
            <BuyButton 
              symbolName={symbolName} 
              symbolPrice={avgBuyPrice} 
              btnTitle="Buy More" 
              quantity={quantity} 
            />
            <SellButton
              symbolName={symbolName}
              symbolPrice={avgBuyPrice}
              currentPrice={currentPrice}
              quantity={quantity}
            />
          </div>
          <DrawerClose asChild>
            <button className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors">
              <XCircle className="h-5 w-5" />
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SymbolInfo;
