import { ChangeEvent, FC, useState } from "react";
import MainLogo from "../../components/miscComponents/MainLogo";
import InputComponent from "../../components/miscComponents/InputComponent";
import { Link } from "react-router-dom";
import axios from "axios";
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
    if (username&&password&&email) {
       try {
         setLoading(true);
         await axios.post(
           `${import.meta.env.VITE_SERVER_URL}/api/user/register`,
           {
             username,
             password,
             email,
           }
         );
         const loginResponse = await axios.post(
           `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
           {
             username,
             password,
           }
         );
         loginStore.loginUser({
           username: loginResponse.data.user.username,
           email: loginResponse.data.user.email,
           id: loginResponse.data.user.id,
         });

         toast.success("Account Created Successfully!");
         setLoading(false);
         navigate("/");
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
    } else {
      toast.warning("Input Fields Cannot be empty")
      
    }
   
  };
  return (
    <div className="flex flex-col items-center gap-32">
      <MainLogo />
      <div className="flex justify-center items-center flex-col gap-4 ">
        <InputComponent
          inputLabel="Email Id"
          inputType="email"
          onChange={handleEmailId}
          placeholder="john@gmail.com"
        />
        <InputComponent
          inputLabel="Username"
          inputType="text"
          onChange={handleUsername}
          placeholder={"John Doe"}
        />
        <InputComponent
          inputLabel="Password"
          inputType="password"
          onChange={handlePassword}
          placeholder="********"
        />
        <button
          className="bg-[#B6CCD7] text-black text-sm text-center p-2 rounded w-4/5 "
          onClick={signupButtonHandler}
          disabled={loading} 
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="flex text-sm items-center">
          <p>
            already have an account ?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
