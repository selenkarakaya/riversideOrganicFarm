import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../components/layouts/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../components/layouts/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState([
    { name: "", email: "", password: "" },
  ]);

  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // I don't want to change formData so  i copied it as formDataCopy.
      const formDataCopy = { ...formData };

      //Now, I don't want the password to get submitted to the database, so we'll take form data copy and what we can do is we can call delete.
      delete formDataCopy.password;

      //Once it's submitted or once it's added, then the server timestamp will get added to it.
      formDataCopy.timestamp = serverTimestamp();

      //setdoc is what is actually going to update the database and add our user to the users collection.
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      updateProfile(auth.currentUser, { displayName: name });
      toast("Thank you for join us!");
      //after sign up, redirect to home page
      navigate("/");
    } catch (error) {
      toast("Something went wrong");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto">
        <header>
          <p className="text-2xl my-2 text-center font-mono">
            Welcome to discover us!
          </p>
          <p className="text-center">
            Become a member — don’t miss out on deals, offers, discounts and
            bonus vouchers.
          </p>
        </header>
        <form
          onSubmit={onSubmit}
          className="md:w-3/4 flex flex-col justify-center items-center my-6"
        >
          <input
            type="text"
            className="nameInput  md:w-1/2 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Name"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput md:w-1/2 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv md:w-1/2">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput md:w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-12 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="w-1/2">
            <p className="text-right">Forgot Password</p>
          </Link>
          <div className="flex justify-center items-center space-x-3 mt-3">
            <button className="flex justify-center items-center space-x-2 p-2 bg-darkGreen  rounded-2xl hover:bg-greens hover:text-white">
              <p className="text-xl">Sign Up</p>
              <ArrowRightIcon width="1.5rem" height="1.5rem" />
            </button>
            <span>or</span>
            <OAuth />
          </div>
        </form>

        <Link to="/SignIn" className="my-2 hover:scale-110">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
