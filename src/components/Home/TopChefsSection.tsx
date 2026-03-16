import type { ChefType } from "../../types/chef.type";
import ChefCard from "../Chefs/ChefCard";

interface TopChefsSectionProps {
    topChefs: ChefType[];
}

const TopChefsSection: React.FC<TopChefsSectionProps> = ({ topChefs }) => (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">השפים המובילים שלנו</h2>
            <p className="text-xl text-gray-600">למד מהמומחים</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topChefs.map((chef, index) => (
                <ChefCard name={chef.user.name} avatar={chef.image}
                    specialty={''} rating={chef.averageRating} chefId={chef.id} key={index} {...chef} />
            ))}
        </div>
    </section>
);

export default TopChefsSection;
