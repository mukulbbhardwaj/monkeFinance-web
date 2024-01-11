import { FC } from "react";

import MainLogo from "./MainLogo";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="flex items-center justify-between ">
      {/* Left Items */}
      <div>
       <MainLogo/>
      </div>
      {/* Right Items */}
      <div className="flex">
        <div className="p-4"> 
          <Link to={'/learn'}>Learn</Link>
        </div>
        <div className="p-4">
          <Link to={`/blogs`}>Blog</Link>
        </div>
        <div className="p-4">
         <Link to={`/account/:userId`}>Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
