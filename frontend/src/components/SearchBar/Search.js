import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import React from "react";
import "./Search.css";
import { useDispatch } from "react-redux";
import { fetchSearchRecipes } from "../../store/recipes.js";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";


function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const countryTagOptions = [
    {
      label: "Countries",
      options: [
        {
          value: "United States",
          label: "United States",
          category: "Countries",
        },
        { value: "Mexico", label: "Mexico", category: "Countries" },
        { value: "Italy", label: "Italy", category: "Countries" },
        { value: "France", label: "France", category: "Countries" },
        { value: "Spain", label: "Spain", category: "Countries" },
        { value: "Greece", label: "Greece", category: "Countries" },
        { value: "China", label: "China", category: "Countries" },
        { value: "Japan", label: "Japan", category: "Countries" },
        { value: "India", label: "India", category: "Countries" },
        { value: "Thailand", label: "Thailand", category: "Countries" },
        { value: "Russia", label: "Russia", category: "Countries" },
        { value: "Brazil", label: "Brazil", category: "Countries" },
        { value: "Vietnam", label: "Vietnam", category: "Countries" },
        { value: "Germany", label: "Germany", category: "Countries" },
        {
          value: "United Kingdom",
          label: "United Kingdom",
          category: "Countries",
        },
        { value: "Peru", label: "Peru", category: "Countries" },
        { value: "Morocco", label: "Morocco", cateogry: "Countries" },
        { value: "Lebanon", label: "Lebanon", category: "Countries" },
        { value: "Ethiopia", label: "Ethiopia", category: "Countries" },
        { value: "South Africa", label: "South Africa", category: "Countries" },
        { value: "Australia", label: "Australia", category: "Countries" },
        { value: "Canada", label: "Canada", category: "Countries" },
        { value: "Sweden", label: "Sweden", category: "Countries" },
        { value: "Indonesia", label: "Indonesia", category: "Countries" },
        { value: "Iran", label: "Iran", category: "Countries" },
        { value: "Poland", label: "Poland", cateogry: "Countries" },
        { value: "South Korea", label: "South Korea", cateogry: "Countries" },
      ],
    },
    {
      label: "Tags",
      options: [
        { value: "vegetarian", label: "vegetarian", category: "Tags" },
        { value: "vegan", label: "vegan", category: "Tags" },
        { value: "gluten-free", label: "gluten-free", category: "Tags" },
        { value: "dairy-free", label: "dairy-free", category: "Tags" },
        { value: "sustainable", label: "sustainable", category: "Tags" },
      ],
    },
  ];

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
      dispatch(fetchSearchRecipes(data));
      if (data.length === 0) {
        setError("No results found.");
        setIsLoading(false);
        if (location !== "recipes") {
          history.push({
            pathname: "/recipes",
            search: `query=${encodeURIComponent(query)}`,
          });
        }
      } else {
        setError("");
        setIsLoading(false);
        if (location !== "recipes") {
          history.push({
            pathname: "/recipes",
            search: `query=${encodeURIComponent(query)}`,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <CreatableSelect
          isMulti
          isCreatable={true}
          options={countryTagOptions}
          placeholder="Search by country or tag..."
          onChange={(selected) => {
            const selectedCountries = selected.filter(
              (option) => option.category !== "Tags"
            );
            const selectedTags = selected.filter(
              (option) => option.category === "Tags"
            );
            setQuery(selected.map((option) => option.value).join(" , "));
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default RecipeSearch;