const Macronutrients = ({macronutrients}) => {
    
    return (
        <>
            {macronutrients?.map((macronutrient, i) => (
                <p key={i}>{macronutrient.name}</p>
            ))}
        </>
    );
};

export default Macronutrients;