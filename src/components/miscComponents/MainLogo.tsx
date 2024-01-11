import { FC } from "react";
import logo from "../../assets/mainLogo.png";
import { Link } from "react-router-dom";

interface MainLogoProps {}

const MainLogo: FC<MainLogoProps> = () => {
  return (
    <div>
      <Link to={"/"}>
        <img src={logo} height={100} width={100}></img>
      </Link>
    </div>
  );
};

export default MainLogo;
