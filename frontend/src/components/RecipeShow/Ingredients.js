const Ingredients = ({ingredients}) => {

    return (
        <ul>
            {ingredients?.map((ingredient, i )=> (
                <li key={i}>{ingredient.amount} {ingredient.unit} <span>{ingredient.name}</span></li>
            ))}
        </ul>
    )
};

export default Ingredients;