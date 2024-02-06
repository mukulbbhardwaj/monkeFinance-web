import { ChangeEvent, FC, useState } from "react";
import MainLogo from "../../components/miscComponents/MainLogo";
import InputComponent from "../../components/miscComponents/InputComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/userStore";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          username,
          email,
          password,
        }
      );
      console.log("Login Response:", response.data.user);
      // const {userId} = 

      loginStore.loginUser({ username: username, email: email, id: response.data.user.id });
      // console.log("From LOgin:", loginStore.user);
      console.log('From Store Login', loginStore.user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
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
        >
          Login
        </button>
        <div className="flex text-sm items-center">
          <p>
            don't have an account yet?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
