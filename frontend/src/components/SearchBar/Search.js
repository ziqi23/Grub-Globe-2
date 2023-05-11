import { useState, useEffect } from "react";
import RecipeCard from "../RecipeIndexPage/RecipeCard";
import CreatableSelect from "react-select/creatable";
import React from "react";

function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);

    const countryTagOptions = [  {    label: 'Countries',    
    options: [      
    { value: 'United States', label: 'United States' },      
    { value: 'Mexico', label: 'Mexico' },      
    { value: 'Italy', label: 'Italy' },      
    { value: 'France', label: 'France' },      
    { value: 'Spain', label: 'Spain' },      
    { value: 'Greece', label: 'Greece' },
    { value: 'China', label: 'China' },
    { value: 'Japan', label: 'Japan' },
    { value: 'India', label: 'India' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'Russia', label: 'Russia' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Vietnam', label: 'Vietnam' },
    { value: 'Germany', label: 'Germany' },
    { value: 'United Kingdom', label: 'United Kingdom' },    ],
    },
    {
        label: 'Tags',
        options: [
        { value: 'vegetarian', label: 'vegetarian' },
        { value: 'vegan', label: 'vegan' },
        { value: 'gluten-free', label: 'gluten-free' },
        { value: 'dairy-free', label: 'dairy-free' },
        { value: 'sustainable', label: 'sustainable' },
        ],
    },
    ];


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(query);
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
        {/* <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> */}
            <CreatableSelect
                isMulti
                isCreatable={true}
                options={countryTagOptions}
                placeholder="Search by country or tag..."
                onChange={(selected) => {
                    setQuery(selected.map((option) => option.value).join(" , "));
                }}
            />
        {/* <button type="submit">Search</button> */}
      </form>
      {results.length > 0 ? (
      <ul>
        {results.map((recipe, idx) => (
          <li key={idx}>
            <h3>{recipe.recipeName}</h3>
            {/* <p>{result.description}</p> */}
             {/* <RecipeCard key={recipe.id} recipe={recipe} /> */}
          </li>
        ))}
      </ul>
      ) : (
        <p>No results found, please try again.</p>
      )}
    </div>
  );
}

export default RecipeSearch;
