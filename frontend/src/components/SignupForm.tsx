import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInput } from "@purushothamak269/medium-common";
import { BACKEND_URL } from "../pages/Config";

export default function SignupForm() {
  const navigate = useNavigate();
  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });

  async function handleSignupRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signupInputs
      );

      const { jwt } = response.data;

      console.log(jwt);
      localStorage.setItem("token", `Bearer ${jwt}`);

      navigate("/blogs");
    } catch (e) {
      alert("Error while signup");
      console.warn(e);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="">Create an account to start blogging.</p>
        </div>

        <form method="POST" className="space-y-4">
          <div className="space-y-2">
            <label className="mb-2 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              id="name"
              type="text"
              placeholder="John Doe"
              onChange={(e) => {
                setSignupInputs({
                  ...signupInputs,
                  name: e.target.value,
                });
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              id="email"
              type="email"
              placeholder="test@example.com"
              onChange={(e) => {
                setSignupInputs({
                  ...signupInputs,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              id="password"
              type="password"
              autoComplete="password"
              onChange={(e) => {
                setSignupInputs({
                  ...signupInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="button"
              className=" bg-slate-900 text-slate-50 w-full py-2 rounded-md font-semibold "
              onClick={handleSignupRequest}
            >
              Sign Up
            </button>

            <div className=" mt-2">
              Already have an account?{" "}
              <NavLink to="/signin" className=" text-blue-700">
                Login
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
