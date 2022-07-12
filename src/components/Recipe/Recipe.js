function Recipe({recipe, toggleFavorite}) {
  const label = recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites';
  return (
    <li>
      {recipe.name}
      <button onClick={() => toggleFavorite}>{label}</button>
    </li>
  );
}

export default Recipe;