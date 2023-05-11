import { useState, useEffect } from "react";
import RecipeCard from "../RecipeIndexPage/RecipeCard";

function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
      if (data.length === 0) {
            setError("No results found.");
        } else {
            setError("");
        }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {results.length > 0 ? (
      <ul>
        {results.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.recipeName}</h3>
            {/* <p>{result.description}</p> */}
          </li>
        // <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
      ) : (
        <p>No results found, please try again.</p>
      )}
    </div>
  );
}

export default RecipeSearch;
