import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="border-t border-border mt-12 py-6 text-muted-foreground text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <p>© 2024 MonkeFinance. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link
              to="https://github.com/mukulbbhardwaj"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
