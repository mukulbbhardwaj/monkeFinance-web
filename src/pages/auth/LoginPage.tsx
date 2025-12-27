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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginStore = useStore();

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const loginButtonHandler = async () => {
    if (username && password) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
          {
            username,
            password,
          }
        );
        loginStore.loginUser({
          username: username,
          email: response.data.user.email || "",
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
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <MainLogo />
      <div className="w-full max-w-md border border-border rounded-lg p-8 bg-card shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        <div className="flex flex-col gap-4">
          <InputComponent
            inputLabel="Username"
            inputType="text"
            onChange={handleUsername}
            placeholder="John Doe"
          />
          <InputComponent
            inputLabel="Password"
            inputType="password"
            onChange={handlePassword}
            placeholder="********"
          />
          <button
            className="bg-primary text-primary-foreground text-center p-4 rounded-lg w-full font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={loginButtonHandler}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
          <div className="flex text-sm items-center justify-center mt-2">
            <p className="text-muted-foreground">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
