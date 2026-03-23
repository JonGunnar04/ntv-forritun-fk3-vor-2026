interface RecipeButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function RecipeButton({ onClick, isLoading }: RecipeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="inline-flex min-w-40 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? 'Loading recipe...' : 'Get recipe'}
    </button>
  );
}
