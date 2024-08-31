import Quote from "../components/Quote";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2">
      <SignupForm />
      <div className=" hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}
