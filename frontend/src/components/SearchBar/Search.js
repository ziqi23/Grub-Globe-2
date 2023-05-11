import { useState, useEffect } from "react";

function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
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
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            <h3>{result.recipeName}</h3>
            {/* <p>{result.description}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeSearch;
