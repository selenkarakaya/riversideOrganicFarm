import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";

function Profile() {
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const auth = getAuth();
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    toast(
      ` Goodbye ${
        auth.currentUser.displayName.split(" ")[0].charAt(0).toUpperCase() +
        auth.currentUser.displayName.split(" ")[0].slice(1).toLowerCase()
      } 👋`
    );
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name on firebase
        await updateProfile(auth.currentUser, { displayName: name });
        //update on firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      toast("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="mb-5">
      <header className="flex items-center space-x-8">
        <p className="pl-2 text-xl">My Account • </p>
        <Link
          to="/Feedback"
          className="text-xl text-greens flex items-center space-x-2"
        >
          <GoCommentDiscussion />
          <p>Help us improve •</p>
        </Link>
        <Link
          to="/Contact"
          className="text-xl text-greens flex items-center space-x-2"
        >
          <BiEditAlt />
          <p> Contact •</p>
        </Link>
        <p
          className="cursor-pointer text-greens text-xl"
          onClick={() => {
            changeDetails && onSubmit();
            setChangeDetails((prevState) => !prevState);
          }}
        >
          {changeDetails ? "Done • " : "Change Details • "}
        </p>
        <div className="flex items-center bg-mediumOrange rounded-lg px-2 py-2 space-x-1 hover:scale-105 hover:bg-greens hover:text-mediumOrange">
          <FiLogOut style={{ color: "white", fontSize: "1.2rem" }} />
          <button
            type="button"
            className=" text-white animate-bounce"
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      </header>
      <main>
        <div className="flex flex-col mt-6">
          <h1 className="text-2xl text-center mb-6">My details</h1>
          <div className="bg-indigo-200 md:w-3/4 mx-auto">
            <form className="flex flex-col justify-center items-center my-4 space-y-4 p-6">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  className={!changeDetails ? "profile" : "profileActive"}
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className={!changeDetails ? "profile" : "profileActive"}
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
