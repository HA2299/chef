export const UnitType = {
    Grams: 0,
    Kilograms:1,
    Milliliters:2,
    Liters: 3,
    Cups:4,
    Tablespoons:5,
    Teaspoons:6,
    Pieces:7
} as const;

export type UnitType = typeof UnitType[keyof typeof UnitType];