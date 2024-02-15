import { ChangeEvent, FC, useState } from "react";
import MainLogo from "../../components/miscComponents/MainLogo";
import InputComponent from "../../components/miscComponents/InputComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/userStore";
import { toast } from "react-toastify";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginStore = useStore();

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const loginButtonHandler = async () => {
    if (username && password) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
          {
            username,
            email,
            password,
          }
        );
        loginStore.loginUser({
          username: username,
          email: email,
          id: response.data.user.id,
        });
        toast.success(`Hi! ${username}`);
        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        if (error.response) {
          const errorMessage =
            error.response.data.message || "An error occurred during login.";

          toast.error(`Login Error: ${errorMessage}`);
        } else if (error.request) {
          toast.error("No response received from the server.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Username or Password cannot be empty");
    }
  };

  return (
    <div className="flex flex-col items-center gap-32">
      <MainLogo />
      <div className="flex justify-center items-center flex-col gap-4 ">
        <InputComponent
          inputLabel="Username"
          inputType="text"
          onChange={handleUsername || handleEmail}
          placeholder={"John Doe"}
        />
        <InputComponent
          inputLabel="Password"
          inputType="password"
          onChange={handlePassword}
          placeholder="********"
        />
        <button
          className="bg-[#B6CCD7] text-black text-center p-4 rounded-xl w-4/5  "
          onClick={loginButtonHandler}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        <div className="flex text-sm items-center">
          <p>
            don't have an account yet?{" "}
            <Link to="/register" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
