const apiUrl = "https://localhost:7136/api";

export interface RatingData {
    recipeId: string;
    ratingValue: number;
}

export interface UserRating {
    rating: number;
}

export async function rateRecipe(data: RatingData): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(
            `${apiUrl}/Recipe/rate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: errorData.error || 'Failed to rate recipe' };
        }
        
        return { success: true };
    } catch (error) {
        console.error('Error rating recipe:', error);
        return { success: false, error: 'Network error' };
    }
}

export async function getUserRating(recipeId: string): Promise<UserRating | null> {
    try {
        const response = await fetch(
            `${apiUrl}/Recipe/rate/${recipeId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return { rating: data.rating };
    } catch (error) {
        console.error('Error fetching user rating:', error);
        return null;
    }
}

export async function getRecipeRatings(recipeId: string) {
    try {
        const response = await fetch(`${apiUrl}/Recipe/ratings/${recipeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipe ratings:', error);
        return null;
    }
}

export async function getAllRatingsForRecipe(recipeId: string) {
    try {
        const response = await fetch(`${apiUrl}/Recipe/all-ratings/${recipeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching all ratings:', error);
        return [];
    }
}
