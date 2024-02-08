import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="border-t-2 mt-8 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-sm text-secondary-foreground">
            © 2024 MonkeFinance. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <Link
            to="https://github.com/mukulbbhardwaj"
            className="text-blue-500 hover:underline"
            target="_blank"
          >
            GitHub
          </Link>
          <Link to="/contact-us" className="text-blue-500 hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
