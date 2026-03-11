export const Paths = {
    login: 'login',
    register: 'register',
    addRecipe: 'add-recipe',
    recipeList: 'recipeList',
    recipeDetail: (recipeId: string) => `recipe/${recipeId}`, 
    generateRecipe: 'generate-recipe',
    chefs: 'chefs',
    myRecipes: 'my-recipes',
    search:'search',
    rating:'rating'
};
