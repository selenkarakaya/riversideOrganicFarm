import { useContext } from "react";
import Spinner from "../components/layouts/Spinner";
import RecipeItem from "./RecipeItem";
import RecipeContext from "../context/RecipeContext";
import { BiBowlHot } from "react-icons/bi";

function RecipeResults() {
  const { recipes, loading, searchName } = useContext(RecipeContext);
  if (!loading) {
    return (
      <>
        {recipes.length > 0 && searchName.length > 0 ? (
          <div className="flex justify-center items-center p-4 space-x-2">
            <h1 className="text-2xl">Our recipes for {searchName}</h1>
            <BiBowlHot style={{ fontSize: "1.5rem", color: "#004F52" }} />
          </div>
        ) : (
          <></>
        )}
        {recipes.length === 0 && searchName.length > 0 ? (
          <div className="flex justify-center items-center p-4 space-x-2">
            <h1 className="text-2xl">No results for {searchName}</h1>
            <BiBowlHot />
          </div>
        ) : (
          <></>
        )}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mx-3">
          {recipes.map((recipe, index) => (
            <RecipeItem key={index} recipe={recipe} />
          ))}
        </div>
      </>
    );
  } else {
    return <Spinner />;
  }
}

export default RecipeResults;
