import { FC, ReactNode } from "react";
import Header from "./components/miscComponents/Header";
import Footer from "./components/miscComponents/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
