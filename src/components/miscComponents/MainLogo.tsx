import { FC, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import logoMobile from '../../assets/logo-sm.png';
import { Link } from "react-router-dom";

interface MainLogoProps {}

const MainLogo: FC<MainLogoProps> = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleImageSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleImageSize();
    window.addEventListener("resize", handleImageSize);
    return () => {
      window.removeEventListener("resize", handleImageSize);
    }
  },[])

  return (
    <div>
      <Link to={"/"}>
        <img src={isMobile?logoMobile :logo} className="w-16 lg:w-48"></img>
      </Link>
    </div>
  );
};

export default MainLogo;
