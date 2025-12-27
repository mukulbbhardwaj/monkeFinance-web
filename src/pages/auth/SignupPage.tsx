import { ChangeEvent, FC, useState } from "react";
import MainLogo from "../../components/miscComponents/MainLogo";
import InputComponent from "../../components/miscComponents/InputComponent";
import { Link } from "react-router-dom";
import apiClient from "../../lib/api";
import { toast } from "react-toastify";
import useStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

interface SignupPageProps {}

const SignupPage: FC<SignupPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleEmailId = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();
  const loginStore = useStore();

  const signupButtonHandler = async () => {
    if (username && password && email) {
      try {
        setLoading(true);
        const registerResponse = await apiClient.post("/api/auth/register", {
          username,
          password,
          email,
        });

        if (registerResponse.data.success && registerResponse.data.data) {
          const { user, token } = registerResponse.data.data;
          loginStore.loginUser(
            {
              username: user.username,
              email: user.email,
              id: user.id,
            },
            token
          );

          toast.success("Account Created Successfully!");
          navigate("/");
        } else {
          toast.error(registerResponse.data.message || "Registration failed");
        }
      } catch (error: any) {
        console.error(error);
        if (error.response) {
          const errorMessage =
            error.response.data?.message || "Registration failed";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Input Fields Cannot be empty");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <MainLogo />
      <div className="w-full max-w-md border border-border rounded-lg p-8 bg-card shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <div className="flex flex-col gap-4">
          <InputComponent
            inputLabel="Email"
            inputType="email"
            onChange={handleEmailId}
            placeholder="john@gmail.com"
          />
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
            onClick={signupButtonHandler}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div className="flex text-sm items-center justify-center mt-2">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
