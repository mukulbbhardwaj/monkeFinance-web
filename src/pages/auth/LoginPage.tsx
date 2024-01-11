import { ChangeEvent, FC, useState } from "react";
import MainLogo from "../../components/miscComponents/MainLogo";
import InputComponent from "../../components/miscComponents/InputComponent";
import { Link } from "react-router-dom";


interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log("username", username);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log("password", password);
  };
  const loginButtonHandler = () => {
    console.log("click");
    
  };
    const getUserInfo = async() => {
      console.log("user");

    };

  return (
    <div className="flex flex-col items-center">
      <MainLogo />
      <div className="bg-secondary-bg rounded-3xl flex justify-center items-center flex-col w-96 p-8 ">
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
          className="bg-cyan-200 text-black text-center border-red p-4 rounded-xl w-4/5 m-4 "
          onClick={loginButtonHandler}
        >
          Login
        </button>
        <button
          className="bg-cyan-200 text-black text-center border-red p-4 rounded-xl w-4/5 m-4 "
          onClick={getUserInfo}
        >
          getUserInfo
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
