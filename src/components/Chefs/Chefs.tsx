import { useDispatch, useSelector } from "react-redux";
import ChefCard from "./ChefCard";
import { type AppDispatch, type RootState } from "../../redux/store";
import { fetchChefs } from "../../redux/thunks";
import { useEffect } from "react";

/**
 * Chefs Component
 * 
 * This component fetches and displays a list of chefs using the ChefCard component.
 */
const Chefs = () => {
    const dispatch = useDispatch<AppDispatch>(); // Dispatch function for Redux actions
    const chefs = useSelector((state: RootState) => state.chefs); // Selector to get chefs from the Redux store

    useEffect(() => {
        dispatch(fetchChefs()); // Fetch chefs when the component mounts
    }, [dispatch]);

    if (!chefs || chefs.length === 0) {
        return <div>No chefs available.</div>; // Display message if no chefs are available
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {chefs.map((chef, index) => (
                    <ChefCard
                        key={index} // Unique key for each ChefCard
                        name={chef.user ? chef.user.name : ""} // Chef's name
                        avatar={chef.image} // Chef's avatar image
                        specialty={""} // Chef's specialty (currently empty)
                        rating={chef.averageRating} // Chef's average rating
                        chefId={chef.id} // Unique identifier for the chef
                    />
                ))}
            </div>
        </div>
    );
}

export default Chefs;
