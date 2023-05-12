const Ingredients = ({ingredients}) => {

    return (
            <ul>
                {ingredients?.map(ingredient => (
                    <li>{ingredient.amount} {ingredient.unit} <p>{ingredient.name}</p></li>
                ))}
            </ul>
    )
};

export default Ingredients;