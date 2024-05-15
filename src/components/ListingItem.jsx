import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GiNotebook } from "react-icons/gi";
import { GiFruitBowl } from "react-icons/gi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useRef } from "react";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";

function ListingItem({ listing, id, onEdit, onDelete }) {
  const nameRef = useRef();
  const sizeRef = useRef();
  const ingredientsRef = useRef();
  const instructionsRef = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      recipeName: nameRef.current.innerText,
      servingSize: sizeRef.current.innerText,
      recipeIngredients: ingredientsRef.current.innerText,
      recipeInstructions: instructionsRef.current.innerText,
    };
    // eslint-disable-next-line
    const docRef = await addDoc(collection(db, "selected"), data);

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
  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col  bg-indigo-300 p-2">
      <div className="flex space-x-4">
        {onDelete && (
          <MdOutlineDeleteSweep
            style={{ fontSize: "1.5rem" }}
            onClick={() => onDelete(listing.id, listing.recipeName)}
          />
        )}

        {onEdit && (
          <CiEdit style={{ fontSize: "1.5rem" }} onClick={() => onEdit(id)} />
        )}
        <MdOutlineAddShoppingCart
          style={{ fontSize: "1.5rem" }}
          onClick={onSubmit}
        />
      </div>
      <h3
        className="font-bold text-xl  text-darkGreen text-center uppercase my-4"
        ref={nameRef}
      >
        {listing.recipeName}
      </h3>

      <div className="flex items-center pb-3">
        <GiFruitBowl style={{ color: "#004F52", fontSize: "1.5rem" }} />
        <p className="text-2xl italic text-greens">Serving Size: </p>
        <p className="text-2xl ml-4" ref={sizeRef}>
          {listing.servingSize}
        </p>
      </div>
      <div className="flex flex-col  border-b-2 border-dashed border-indigo-800 pb-3">
        <div className="flex">
          <GiFruitBowl style={{ color: "#004F52", fontSize: "1.5rem" }} />
          <p className="text-2xl italic text-greens">Ingredients:</p>
        </div>
        <p className="text-2xl ml-4" ref={ingredientsRef}>
          {listing.recipeIngredients}
        </p>
      </div>

      <div className="flex flex-col  pb-3 mt-4">
        <div className="flex">
          <GiNotebook style={{ color: "#004F52", fontSize: "1.5rem" }} />
          <p className="text-2xl italic text-greens">Instructions:</p>
        </div>
        <p className="text-2xl ml-4" ref={instructionsRef}>
          {listing.recipeInstructions}
        </p>
      </div>
    </div>
  );
}

export default ListingItem;
