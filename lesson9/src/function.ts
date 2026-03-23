export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  cuisines: string[];
  dishTypes: string[];
}

interface RandomRecipeResponse {
  recipes?: SpoonacularRecipe[];
}

const API_KEY = 'c4d8e6e03a7045d6bf5291cf5ea15939';
const RANDOM_RECIPE_URL = 'https://api.spoonacular.com/recipes/random';

export async function getRandomRecipe(): Promise<SpoonacularRecipe> {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    number: '1',
  });

  const response = await fetch(`${RANDOM_RECIPE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipe. Please try again.');
  }

  const data = (await response.json()) as RandomRecipeResponse;
  const recipe = data.recipes?.[0];

  if (!recipe) {
    throw new Error('No recipe was returned from the API.');
  }

  return recipe;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}
