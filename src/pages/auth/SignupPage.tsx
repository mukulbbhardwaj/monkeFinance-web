import { ChangeEvent, FC, useState } from "react";
import MainLogo from "../../components/miscComponents/MainLogo";
import InputComponent from "../../components/miscComponents/InputComponent";
import { Link } from "react-router-dom";
import axios from "axios";

interface SignupPageProps {}

const SignupPage: FC<SignupPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log("username", username);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log("password", password);
  };

  const handleEmailId = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log("password", email);
  };
  const signupButtonHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        username,
        password,
        email,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
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
        >
          SignUp
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
