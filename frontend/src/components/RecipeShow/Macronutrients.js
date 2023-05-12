const Macronutrients = ({macronutrients}) => {
    
    return (
        <>
            {macronutrients?.map((macronutrient, i) => (
                <p key={i}>{macronutrient.name}: {macronutrient.amount}{macronutrient.unit} {`(${macronutrient.percentOfDailyNeeds}%)`}</p>
            ))}
        </>
    );
};

export default Macronutrients;