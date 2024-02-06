import { FC } from "react";

import MainLogo from "./MainLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStore from "@/store/userStore";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";

const menus: { title: string; href: string }[] = [
  { title: "Learn", href: "/learn" },
  { title: "Blogs", href: "/blogs" },
];

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const userStore = useStore();
  const navigate = useNavigate();
  const handleLogOut = () => {
    userStore.logoutUser();
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between content-center">
      <div>
        <MainLogo />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-white">
          <DropdownMenuGroup>
            {menus.map((menu, title) => (
              <DropdownMenuItem key={title}>
                <Link to={menu.href}>{menu.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {userStore.user ? (
              <>
                <DropdownMenuItem>
                  <Link to={`/dashboard/${userStore.user?.username}`}>
                    Portfolio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem className="flex align-top">
                <p>
                  <Link to={"login"} className="underline">
                    Login
                  </Link>{" "}
                  or{" "}
                  <Link to={"/register"} className="underline">
                    Register{" "}
                  </Link>
                  to see your portfolio
                </p>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
