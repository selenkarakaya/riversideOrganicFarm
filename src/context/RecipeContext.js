import { createContext, useState } from "react";
const RecipeContext = createContext();

// const url = "https://api.api-ninjas.com/v1/recipe?query=";
// const token = "K/EWGzuNKY0CNdL9ZpLnqg==aGC2P1EOqR0WIwwS";

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  // grab the text from input and search it on Api
  const fetchRecipes = async (text) => {
    setLoading(true);
    const query = text;

    setSearchName(text);

    const response = await fetch(
      "https://api.api-ninjas.com/v1/recipe?query=" + query,
      {
        headers: {
          "X-Api-Key": "K/EWGzuNKY0CNdL9ZpLnqg==aGC2P1EOqR0WIwwS",
        },
      }
    );
    const data = await response.json();
    setRecipes(data);
    setLoading(false);
  };

  //delete all displayed recipes
  const handleDeleteAll = () => {
    const newRecipes = [];
    setRecipes(newRecipes);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        searchName,
        fetchRecipes,
        handleDeleteAll,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
