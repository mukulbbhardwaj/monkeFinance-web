import { ChangeEvent, FC, useState } from "react";
import MainLogo from "../../components/miscComponents/MainLogo";
import InputComponent from "../../components/miscComponents/InputComponent";
import { Link } from "react-router-dom";


interface SignupPageProps {}

const SignupPage: FC<SignupPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log("username", username);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log("password", password);
  };

  const handleEmailId = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailId(event.target.value);
    console.log("password", emailId);
  };
  const signupButtonHandler = () => {
    console.log("click");
  
  };

  return (
    <div className="flex flex-col items-center">
      <MainLogo />
      <div className="bg-secondary-bg rounded-3xl flex justify-center items-center flex-col w-96 p-8 ">
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
        {/* <InputComponent
          inputLabel="Confirm Password"
          inputType="password"
          onChange={handleConfirmPassword}
          placeholder="********"
        /> */}

        <button
          className="bg-cyan-200 text-black text-center border-red p-4 rounded-xl w-4/5 m-4 "
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
