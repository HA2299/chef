import { useEffect } from "react";
import useFetchChefs from "../hooks/useFetchChefs";
import type { ChefType } from "../types/ChefType";
import ChefCard from "./ChefCard";
import { useDispatch, useSelector } from 'react-redux';

const Chefs = () => {
    // const dispatch = useDispatch();
    // const availableChefs = useSelector((state: RootState) => state.chefs.chefs);

    // useEffect(() => {
    //     dispatch(fetchChefs());
    // }, [dispatch]);

    // if (!Array.isArray(availableChefs) || availableChefs.length === 0) {
    //     return <div>No chefs available.</div>;
    // }
    const { availableChefs, loading } = useFetchChefs();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!availableChefs || availableChefs.length === 0) {
        return <div>No chefs available.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {availableChefs.map((chef, index) => (
                    <ChefCard
                        key={index}
                        name={chef.user.name}
                        avatar={chef.image}
                        specialty={""}
                        // recipeCount={chef.recipes.length}
                        rating={chef.averageRating}
                        chefId={chef.id}
                    />
                ))}

            </div>
        </div>
    );

}

export default Chefs;
