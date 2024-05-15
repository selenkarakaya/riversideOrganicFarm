import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/layouts/Spinner";
import SelectedItem from "../components/SelectedItem";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Title from "../components/Title";

function OurRecipeBoxes() {
  Title("Meal Kit Plans & Selected Meal");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servingSize, setServingSize] = useState(0);
  const [money, setMoney] = useState(0);
  // eslint-disable-next-line
  const [recipeSize, setRecipeSize] = useState(0);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const [price, setPrice] = useState(5.99);

  useEffect(() => {
    const fetchSelected = async () => {
      try {
        // Get collection
        const selectedRef = collection(db, "selected");
        //Create query
        const q = query(selectedRef, orderBy("recipeName", "desc"), limit(20));
        // Execute query
        const querySnap = await getDocs(q);
        //initialize an empty array
        const selected = [];

        querySnap.forEach((doc) => {
          selected.push({ id: doc.id, data: doc.data() });
        });

        setSelected(selected);
        setLoading(false);
      } catch (error) {}
    };
    fetchSelected();
  }, []);

  const onDelete = async (selectionId) => {
    await deleteDoc(doc(db, "selected", selectionId));
    const updatedselected = selected.filter(
      (selection) => selection.id !== selectionId
    );
    setSelected(updatedselected);
    toast.success("Successfully deleted to your recipe", {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onMutate = (e) => {
    setServingSize(e.target.value);
  };

  const onCalculate = (e) => {
    setShow(true);
    if (selected) {
      setMoney(selected.length * servingSize * price);
      setRecipeSize(selected.length);
    }
  };

  const onDay = (e) => {
    if (e.target.innerText === "Same day delivery") {
      setTotal(selected.length * servingSize * price + 4.99);
    } else {
      setTotal(selected.length * servingSize * price + 1.99);
    }
  };

  const auth = getAuth();
  var user = auth.currentUser;

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : selected && selected.length > 0 ? (
        <>
          <div className=" border-b border-darkGreen my-10">
            <h1 className="text-center text-3xl">
              Choose your plan size
              <i className="fa-brands fa-pagelines text-greens"></i>
            </h1>
            <p className="text-center text-3l mb-4">
              We'll use this as your default plan size, but you can customise it
              from week to week.
            </p>
          </div>
          <form className="flex justify-center mb-10">
            <div className="w-full md:w-1/3 px-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="servingSize"
              >
                Number of people
              </label>
              <input
                className="w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                id="servingSize"
                type="number"
                placeholder="2"
                min="1"
                max="5"
                required
                value={servingSize}
                onChange={onMutate}
              />
            </div>
          </form>
          {/* display item */}
          <div className="grid md:grid-cols-4 gap-4 mx-auto">
            {selected.map((selection) => (
              <SelectedItem
                selection={selection.data}
                id={selection.id}
                key={selection.id}
                onDelete={() => {
                  onDelete(selection.id);
                }}
                setServingSize={setServingSize}
                servingSize={servingSize}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={onCalculate}
              className="w-1/4 bg-darkGreen py-4 rounded-2xl hover:bg-greens hover:text-white mt-10"
            >
              Show price
            </button>
          </div>
        </>
      ) : user && selected.length === 0 ? (
        <h1 className="text-3xl text-center">Your Riverside box is empty!</h1>
      ) : (
        <div className="flex flex-col items-center border-t border-darkGreen my-10">
          <p className="text-2xl mt-4">
            Please select recipes for order. If you register, you costumsize and
            create own your recipes and add the your box!
          </p>
          <Link
            to="/SignIn"
            className="my-2 mx-2 py-1 px-4 bg-mediumGreen  rounded-lg hover:bg-greens hover:text-white"
          >
            Let's started!
          </Link>
        </div>
      )}

      {show ? (
        <>
          <div className="border-2 border-indigo-800 w-2/4 mx-auto my-10">
            <div className="border-b border-dashed border-greens p-5">
              <h1 className="font-bold text-2xl">Price summary</h1>
              <p className="text-lg">
                {selected.length} meals for {servingSize} people per week
              </p>
              <p className="text-lg">
                {selected.length * servingSize} total servings
              </p>
            </div>
            <div className="p-5">
              <div className="flex justify-between">
                <p className="text-lg">Box price</p>
                {money > 0 ? (
                  <p className="text-lg">{money.toFixed(2)}£</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Price per serving </p>
                <p className="text-lg">{price}£</p>
              </div>
              <div className="flex justify-between border-b border-dashed border-greens">
                <p className="text-lg">Shipping</p>
                <div className="flex flex-col space-y-2 mb-2">
                  <div className="flex items-center space-x-2 ">
                    <button
                      onClick={onDay}
                      className="border hover:scale-105 p-1"
                    >
                      Same day delivery
                    </button>
                    <p className="text-lg">5.99£</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={onDay}
                      className="border hover:scale-105 p-1"
                    >
                      Standart delivery
                    </button>
                    <p className="text-lg">1.99£</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-5 mt-4 h-20 bg-indigo-100">
              <p className="text-xl">Box total</p>
              <p className="text-xl">{total.toFixed(2)}£</p>
            </div>
          </div>
          {user ? (
            <div className="flex justify-center">
              <Link
                to="/Checkout"
                className="my-2 mx-2 py-4 px-4 bg-mediumGreen  rounded-lg hover:bg-greens hover:text-white"
              >
                Continue to checkout
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link
                to="/SignUp"
                className="my-2 mx-2 py-4 px-4 bg-mediumGreen  rounded-lg hover:bg-greens hover:text-white"
              >
                Register
              </Link>
              or
              <Link
                to="/SignIn"
                className="my-2 mx-2 py-4 px-4 bg-mediumGreen  rounded-lg hover:bg-greens hover:text-white"
              >
                Sign in
              </Link>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OurRecipeBoxes;
