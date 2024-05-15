import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/layouts/Spinner";

function EditFeedback() {
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
  });
  const { name, feedback } = formData;
  const [feedbacks, setFeedbacks] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  // sayfa adindan id almak
  const params = useParams();
  const isMounted = useRef(true);

  // Redirect if listing is not user's
  useEffect(() => {
    if (feedbacks && feedbacks.userRef !== auth.currentUser.uid) {
      toast.error("You can not edit that feedback");
      navigate("/SignUp");
    }
  });

  // Fetch listing to edit
  useEffect(() => {
    setLoading(true);
    const fetchFeedback = async () => {
      const docRef = doc(db, "feedback", params.feedbacksId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFeedbacks(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Feedback does not exist");
      }
    };

    fetchFeedback();
  }, [params.feedbacksId, navigate]);

  // Sets userRef to logged in user
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/SignIn");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onChange = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Text/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDataCopy = {
      ...formData,
    };
    //update feedback
    const docRef = doc(db, "feedback", params.feedbacksId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Your feedback was updated 👏", {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(`/`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center mx-autor">
      <header className="border-b border-dotted border-mediumOrange w-1/2 mb-4">
        <p className="text-2xl mt-2 text-center ">
          Help us improve!
          <i className="fa-regular fa-face-grin-stars fa-bounce  text-greens ml-2"></i>
        </p>
      </header>
      <h1>Rate your app or website experience</h1>
      {/* add star */}
      <h2>
        Please share your feedback, for us to improve the app or website
        experience
      </h2>
      <form className="md:w-3/4 flex flex-col justify-center items-center my-6 space-y-4">
        <div className="col-span-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Your Name
          </label>
          <textarea
            name="name"
            id="name"
            rows="1"
            cols="70"
            className="textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={name}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Feedback
          </label>
          <textarea
            placeholder="Write a few sentences about your opinion and suggestion or problems."
            name="feedback"
            id="feedback"
            rows="8"
            cols="70"
            className="textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={feedback}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-mediumOrange py-2 px-4 rounded-lg text-indigo-100 hover:bg-indigo-100 hover:text-mediumOrange hover:scale-110"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditFeedback;
