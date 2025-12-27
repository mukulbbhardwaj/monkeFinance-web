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
  // Ensure currentPrice is a number
  const safeCurrentPrice = typeof currentPrice === 'number' && !isNaN(currentPrice) 
    ? currentPrice 
    : 0;
  
  // Ensure avgBuyPrice is a number
  const safeAvgBuyPrice = typeof avgBuyPrice === 'number' && !isNaN(avgBuyPrice)
    ? avgBuyPrice
    : 0;

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
              <p className="text-lg font-semibold">₹{safeAvgBuyPrice.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-lg font-semibold">
                {safeCurrentPrice > 0 ? `₹${safeCurrentPrice.toFixed(2)}` : 'Loading...'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Returns</p>
              <p className={`text-lg font-bold ${typeof returns === 'number' && returns >= 0 ? 'text-profit' : 'text-loss'}`}>
                {typeof returns === 'number' && !isNaN(returns) && returns >= 0 ? '+' : ''}₹{typeof returns === 'number' && !isNaN(returns) ? Math.abs(returns).toFixed(2) : (returns || '0.00')}
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
              symbolPrice={safeAvgBuyPrice}
              currentPrice={safeCurrentPrice}
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
