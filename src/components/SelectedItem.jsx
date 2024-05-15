import React from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";

function SelectedItem({ selection, id, onDelete }) {
  return (
    <>
      <div>
        <div className="rounded overflow-hidden shadow-lg flex flex-col  bg-indigo-300 p-2">
          <div className="flex space-x-4">
            {onDelete && (
              <MdOutlineDeleteSweep
                style={{ fontSize: "1.5rem", color: "#004F52" }}
                onClick={() => onDelete(selection.id, selection.recipeName)}
              />
            )}
          </div>
          <h3 className="font-bold text-xl  text-darkGreen text-center uppercase my-4 border-b-2 border-dashed border-indigo-800">
            {selection.recipeName}
          </h3>
          <div className="flex items-center  pb-3">
            <GiFruitBowl style={{ color: "#004F52", fontSize: "1.5rem" }} />
            <p className="text-2xl italic text-greens">Ingredients:</p>
          </div>
          <p className="text-2xl ml-4">
            {selection.recipeIngredients.toLowerCase()}
          </p>
        </div>
      </div>
    </>
  );
}

export default SelectedItem;
