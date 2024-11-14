import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/layouts/Spinner";

function CreateOwnRecipe() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipeName: "",
    servingSize: 1,
    recipeIngredients: "",
    recipeInstructions: "",
  });
  const { recipeName, servingSize, recipeIngredients, recipeInstructions } =
    formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/SingIn");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onMutate = (e) => {
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
    // eslint-disable-next-line
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Your recipe is saved 🫶", {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(`/YourRecipes`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-1/3 mx-auto">
      <form className="w-full max-w-lg" onSubmit={onSubmit}>
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="recipeName"
            >
              Recipe Name
            </label>
            <input
              className=" block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="recipeName"
              type="text"
              placeholder="Name your recipe"
              maxLength="32"
              minLength="3"
              value={recipeName}
              onChange={onMutate}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="servingSize"
            >
              Serving Size
            </label>
            <input
              className="appearance-none block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="servingSize"
              type="number"
              placeholder="2"
              min="1"
              max="10"
              value={servingSize}
              onChange={onMutate}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="recipeIngredients"
            >
              Ingredients
            </label>
            <textarea
              id="recipeIngredients"
              name="recipeIngredients"
              rows="3"
              className="block w-full rounded-md border-0 py-1.5 bg-indigo-100 text-indigo-600  border-indigo-800 focus:bg-white shadow-sm ring-1 sm:text-sm sm:leading-6"
              value={recipeIngredients}
              onChange={onMutate}
              required
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="recipeInstructions"
            >
              Instructions
            </label>
            <textarea
              id="recipeInstructions"
              name="recipeInstructions"
              rows="3"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1  bg-indigo-100 text-indigo-600  border-indigo-800 focus:bg-white  sm:text-sm sm:leading-6"
              value={recipeInstructions}
              onChange={onMutate}
              required
            ></textarea>
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 bg-darkGreen py-4 rounded-2xl hover:bg-greens hover:text-white"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateOwnRecipe;
