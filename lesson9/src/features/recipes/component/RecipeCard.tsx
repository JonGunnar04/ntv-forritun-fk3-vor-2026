import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { stripHtml, type SpoonacularRecipe } from '@/function';

interface RecipeCardProps {
  recipe: SpoonacularRecipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const tags = [
    ...(recipe.cuisines ?? []),
    ...(recipe.dishTypes ?? []),
    recipe.vegetarian ? 'Vegetarian' : null,
    recipe.vegan ? 'Vegan' : null,
    recipe.glutenFree ? 'Gluten free' : null,
    recipe.dairyFree ? 'Dairy free' : null,
  ].filter(Boolean) as string[];

  return (
    <Card className="w-full max-w-2xl overflow-hidden rounded-2xl border bg-card py-0 text-left shadow-lg">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-72 w-full object-cover"
      />

      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-2xl">{recipe.title}</CardTitle>
        <CardDescription className="text-base">
          Ready in {recipe.readyInMinutes} minutes • Servings: {recipe.servings}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6">
        <p className="text-sm leading-6 text-muted-foreground">
          {stripHtml(recipe.summary)}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          View full recipe
        </a>
      </CardContent>
    </Card>
  );
}
