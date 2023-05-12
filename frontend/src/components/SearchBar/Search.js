import { useState, useEffect } from "react";
import RecipeCard from "../RecipeIndexPage/RecipeCard";
import CreatableSelect from "react-select/creatable";
import React from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchSearchRecipes} from "../../store/recipes.js"

function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [queryTags, setQueryTags] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

    const countryTagOptions = [  {    label: 'Countries',    
    options: [      
    { value: 'United States', label: 'United States', category: 'Countries' },      
    { value: 'Mexico', label: 'Mexico', category: 'Countries'  },      
    { value: 'Italy', label: 'Italy', category: 'Countries'  },      
    { value: 'France', label: 'France', category: 'Countries'  },      
    { value: 'Spain', label: 'Spain', category: 'Countries'  },      
    { value: 'Greece', label: 'Greece', category: 'Countries'  },
    { value: 'China', label: 'China', category: 'Countries'  },
    { value: 'Japan', label: 'Japan', category: 'Countries'  },
    { value: 'India', label: 'India', category: 'Countries'  },
    { value: 'Thailand', label: 'Thailand', category: 'Countries'  },
    { value: 'Russia', label: 'Russia', category: 'Countries'  },
    { value: 'Brazil', label: 'Brazil', category: 'Countries'  },
    { value: 'Vietnam', label: 'Vietnam', category: 'Countries'  },
    { value: 'Germany', label: 'Germany', category: 'Countries'  },
    { value: 'United Kingdom', label: 'United Kingdom', category: 'Countries'  }, 
    { value: 'Peru', label: 'Peru', category: 'Countries'},
    { value: 'Morocco', label: 'Morocco', cateogry:'Countries'},
    { value: 'Lebanon', label: 'Lebanon', category: 'Countries'},
    { value: 'Ethiopia', label: 'Ethiopia', category: 'Countries'},
    { value: 'South Africa', label: 'South Africa', category: 'Countries'},
    { value: 'Australia', label: 'Australia', category: 'Countries'},
    { value: 'Canada', label: 'Canada', category: 'Countries'}, 
    { value: 'Sweden', label: 'Sweden', category: 'Countries'},
    { value: 'Indonesia', label: 'Indonesia', category: 'Countries'},
    { value: 'Iran', label: 'Iran', category: 'Countries'},
    { value: 'Poland', label: 'Poland', cateogry: 'Countries'} ],
    },
    {
        label: 'Tags',
        options: [
        { value: 'vegetarian', label: 'vegetarian', category: 'Tags' },
        { value: 'vegan', label: 'vegan', category: 'Tags' },
        { value: 'gluten-free', label: 'gluten-free', category: 'Tags' },
        { value: 'dairy-free', label: 'dairy-free', category: 'Tags' },
        { value: 'sustainable', label: 'sustainable', category: 'Tags' },
        ],
    },
    ];


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(query, 'query');
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
      dispatch(fetchSearchRecipes(data))
      if (data.length === 0) {
            setError("No results found.");
        } else {
            setError("");

        }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (query && results.length === 0) {
      setError("No results found.");
    } else {
      setError("");
    }
  }, [query, results]);

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
         <CreatableSelect
                isMulti
                isCreatable={true}
                options={countryTagOptions}
                placeholder="Search by country or tag..."
                onChange={(selected) => {
                  const selectedCountries = selected.filter((option) => option.category !== 'Tags');
                  const selectedTags = selected.filter((option) => option.category === 'Tags');
                  setQuery(selected.map((option) => option.value).join(" , ") );
                  // setQueryTags(selectedTags.map((option) => option.value));
                }}
        />
      </form>
      {/* {results.length ? (
      <ul className="search-results">
        {results.map((recipe, idx) => (
          <li key={idx}>
            <h3>{recipe.recipeName}</h3> */}
            {/* <p>{result.description}</p> */}
             {/* <RecipeCard key={recipe.id} recipe={recipe} /> */}
          {/* </li>
        ))}
      </ul>
      ) : (
         query && <p className="no-result-message">{error || "No results found, please try again."}</p>
      )} */}
    </div>
  );
}

export default RecipeSearch;
