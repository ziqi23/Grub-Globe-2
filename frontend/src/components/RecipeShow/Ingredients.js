const Ingredients = ({ingredients}) => {
    return (
        <div className="ingredients-container">
            <ul>
                {/* {recipe.ingredients.map(ingredient => {
                    <li>ingredient</li>
                })} */}
                <li>4 pieces <p>boneless chicken thighs</p></li>
                <li>1/4 cup <p>soy sauce</p></li>
                <li>1/4 cup <p>mirin</p></li>
                <li>1/4 cup <p>sake</p> </li>
                <li>1/4 cup <p>sugar</p></li>
                <li>2 tbsp <p>vegetable oil</p></li>
                <li>2 stalks <p>green onion</p></li>
                <li>4 cups <p>cooked rice</p></li>
            </ul>
        </div>
    )
};

export default Ingredients;