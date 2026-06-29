import React from 'react';

interface UnitSelectProps {
    selectedUnitId: number | null;
    onChange: (id: number | null) => void;
}

const UnitSelect: React.FC<UnitSelectProps> = ({ selectedUnitId, onChange }) => {
    const UnitNames: { [key: number]: string } = {
        0:"Grams",
        1:"Kilograms",
        2:"Milliliters",
        3:"Liters",
        4:"Cups",
        5:"Tablespoons",
        6:"Teaspoons",
        7:"Pieces"
    };

    const availableUnits = Object.keys(UnitNames).map(key => ({
        id: Number(key),
        name: UnitNames[Number(key)]
    }));

    return (
        <select value={selectedUnitId || ''} onChange={(e) => onChange(Number(e.target.value))}>
            <option value="">Select a Unit</option>
            {availableUnits.map((Unit) => (
                <option key={Unit.id} value={Unit.id}>{Unit.name}</option>
            ))}
        </select>
    );
};

export default UnitSelect;
