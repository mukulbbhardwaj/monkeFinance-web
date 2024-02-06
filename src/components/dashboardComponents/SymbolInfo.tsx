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
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">{symbolName}</DrawerTitle>
          <p>Quantity: {quantity}</p>
          <p>Average Buying Price:{avgBuyPrice}</p>
          <p>Current Price{currentPrice}</p>
          <p>Total Returns: {returns}</p>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex w-full justify-around">
            <BuyButton symbolName={symbolName} symbolPrice={avgBuyPrice} btnTitle={"Buy More"} quantity={quantity} />
            <SellButton
              symbolName={symbolName}
              symbolPrice={avgBuyPrice}
              currentPrice={currentPrice}
              quantity={quantity}
            />
            <DrawerClose>
              <XCircle />
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SymbolInfo;
