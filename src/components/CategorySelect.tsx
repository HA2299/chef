import React from 'react';

interface CategorySelectProps {
    selectedCategoryId: number | null;
    onChange: (id: number ) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ selectedCategoryId, onChange }) => {
    const categoryNames: { [key: number]: string } = {
        0: 'Appetizer',
        1: 'Main Course',
        2: 'Dessert',
        3: 'Beverage',
        4: 'Salad',
        5: 'Soup'
    };

    const availableCategories = Object.keys(categoryNames).map(key => ({
        id: Number(key) + 1, // אם אתה רוצה שה-id יתחיל מ-1
        name: categoryNames[Number(key)]
    }));

    return (
        <select value={selectedCategoryId || ''} onChange={(e) => onChange(Number(e.target.value))}>
            <option value="">Select a category</option>
            {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    );
};

export default CategorySelect;
