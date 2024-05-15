import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../components/layouts/svg/keyboardArrowRightIcon.svg";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast("Could not send reset email");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <header>
        <p className="text-2xl mt-2">Forgot Password</p>
      </header>
      <form
        onSubmit={onSubmit}
        className="w-3/4 flex flex-col justify-center items-center my-6 space-y-5"
      >
        <input
          type="email"
          className="emailInput w-3/4 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <button className="flex justify-center items-center space-x-2 p-2 bg-darkGreen  rounded-2xl hover:bg-greens hover:text-white">
          <p className="text-xl">Send Reset Link</p>
          <ArrowRightIcon width="1.5rem" height="1.5rem" />
        </button>

        <Link className="hover:scale-110" to="/signIn">
          Sign In
        </Link>
      </form>
    </div>
  );
}

export default ForgetPassword;
