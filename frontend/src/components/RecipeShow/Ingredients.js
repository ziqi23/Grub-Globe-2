const Ingredients = ({ingredients}) => {

    return (
        <div className="ingredients-container">
            <ul>
                {ingredients?.map(ingredient => (
                    <li>{ingredient.amount} {ingredient.unit} <p>{ingredient.name}</p></li>
                ))}
            </ul>
        </div>
    )
};

export default Ingredients;