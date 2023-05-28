import MacroNutrients from "~/components/MacroNutrients";

// Just show the component

const Page = () => {
    return (
        <>
            <MacroNutrients carbs={10} protein={20} fat={30} />
        </>
    );
};

export default Page;