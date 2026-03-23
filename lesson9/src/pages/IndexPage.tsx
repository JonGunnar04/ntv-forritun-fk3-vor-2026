import { useState } from 'react';

import { RecipeButton, RecipeCard } from '@/features';
import { getRandomRecipe, type SpoonacularRecipe } from '@/function';
import { Card, CardContent } from '@/shared/components/ui/card';

export function IndexPage() {
  const [recipe, setRecipe] = useState<SpoonacularRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecipe = async () => {
    try {
      setIsLoading(true);
      setError('');
      const randomRecipe = await getRandomRecipe();
      setRecipe(randomRecipe);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong fetching recipe.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Recipe feature</h1>
        <p className="text-sm text-muted-foreground">
          Press the button to fetch a random recipe from Spoonacular.
        </p>
      </div>

      <RecipeButton onClick={handleGetRecipe} isLoading={isLoading} />

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {recipe ? (
        <RecipeCard recipe={recipe} />
      ) : (
        <Card className="w-full max-w-2xl rounded-2xl border border-dashed py-0">
          <CardContent className="px-6 py-16 text-center text-muted-foreground">
            No recipe loaded yet. Click <span className="font-semibold">Get recipe</span>{' '}
            to show one here.
          </CardContent>
        </Card>
      )}
    </section>
  );
}
