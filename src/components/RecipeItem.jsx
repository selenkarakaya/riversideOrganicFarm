//display recipe item
import { PiShoppingCartDuotone } from "react-icons/pi";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useState, useRef } from "react";
import { GiNotebook } from "react-icons/gi";
import { GiFruitBowl } from "react-icons/gi";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";

function RecipeItem({ recipe: { title, ingredients, instructions } }) {
  const [isActive, setIsActive] = useState(false);
  const nameRef = useRef();
  const ingredientsRef = useRef();
  const instructionsRef = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      recipeName: nameRef.current.innerText,
      servingSize: "",
      recipeIngredients: ingredientsRef.current.innerText,
      recipeInstructions: instructionsRef.current.innerText,
    };
    // eslint-disable-next-line
    const docRef = await addDoc(collection(db, "selected"), data);
    setIsActive(!isActive);
    toast.success("Successfully added to your box 😋", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //isAcvtive yolan yerde, biriyle yemek adini alip digeriyle kaldir yapabilirim
  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col items-center bg-indigo-300">
      <div className="justify-self-end">
        <button
          onClick={onSubmit}
          className="p-2 border-2 border-darkGreen mt-1 rounded-lg hover:scale-110 hover:bg-darkGreen hover:text-white"
        >
          {isActive ? <MdOutlineDoneOutline /> : <PiShoppingCartDuotone />}
        </button>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div>
          <p
            className="font-bold text-xl  text-darkGreen text-center "
            ref={nameRef}
          >
            {title}
          </p>
        </div>

        <div className="border-b-2 border-dashed border-indigo-800 pb-3">
          <div className="flex mb-2">
            <GiFruitBowl style={{ color: "#004F52", fontSize: "1.5rem" }} />
            <p className="text-xl italic text-greens">Ingredients:</p>
          </div>
          <p className="text-xl ml-4" ref={ingredientsRef}>
            {ingredients.toLowerCase()}
          </p>
        </div>
        <div>
          <div className="flex mb-2">
            <GiNotebook style={{ color: "#004F52", fontSize: "1.5rem" }} />
            <p className="text-xl italic text-greens">Instructions:</p>
          </div>
          <p className="text-xl ml-4" ref={instructionsRef}>
            {instructions.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
