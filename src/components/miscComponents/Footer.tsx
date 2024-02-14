import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="border-t-2 mt-8 p-4 text-secondary-foreground text-sm ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p>© 2024 MonkeFinance. All rights reserved.</p>
        </div>
        <div className="flex ">
          <Link
            to="https://github.com/mukulbbhardwaj"
            className=" hover:underline hover:text-white"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
