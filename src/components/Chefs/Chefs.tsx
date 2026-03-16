import { useDispatch, useSelector } from "react-redux";
import ChefCard from "./ChefCard";
import { fetchChefs, type AppDispatch, type RootState } from "../../redux/store";
import { useEffect } from "react";

const Chefs = () => {
    const dispatch = useDispatch<AppDispatch>();
    const chefs = useSelector((state: RootState) => state.chefs);

    useEffect(() => {
        dispatch(fetchChefs());
    }, [dispatch]);

    if (!chefs || chefs.length === 0) {
        return <div>No chefs available.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {chefs.map((chef, index) => (
                    <ChefCard
                        key={index}
                        name={chef.user.name}
                        avatar={chef.image}
                        specialty={""}
                        rating={chef.averageRating}
                        chefId={chef.id}
                    />
                ))}

            </div>
        </div>
    );

}

export default Chefs;
