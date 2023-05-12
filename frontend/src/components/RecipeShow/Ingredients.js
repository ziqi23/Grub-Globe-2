const Ingredients = ({ingredients}) => {

    return (
        <ul>
            {ingredients?.map((ingredient, i )=> (
                <li key={i}>{ingredient.amount} {ingredient.unit} <p>{ingredient.name}</p></li>
            ))}
        </ul>
    )
};

export default Ingredients;