/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Recipe from './components/Recipe/Recipe';
import recipeService from './services/recipes';
// import Notification from './components/Notification/Notification';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState('');
  const [showAllRecipes, setShowAllRecipes] = useState(true);
  const [errorMessage, setErrorMessage] = useState('an error has occurred');

  // useEffect(() => {
  //   recipeService.getAll().then((initialRecipes) => {
  //     setRecipes(initialRecipes);
  //   });
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/api/recipes').then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const toggleFavoriteOf = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    const changedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };

    recipeService
      .update(id, changedRecipe)
      .then((returnedRecipe) => {
        setRecipes(recipes.map((recipe) => (recipe.id !== id ? recipe : returnedRecipe)));
      })
      .catch((error) => {
        setErrorMessage(`This recipe has already been deleted.`);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 5000);
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      });
  };

  const addRecipe = (event) => {
    event.preventDefault();
    const recipeObject = {
      content: newRecipe,
      dateAdded: new Date().toDateString(),
      isFavorite: Math.random() < 0.5,
      id: recipes.length + 1
    };

    recipeService.create(recipeObject).then((returnedRecipe) => {
      setRecipes(recipes.concat(returnedRecipe));
      setNewRecipe('');
    });
  };

  const handleRecipeChange = (event) => {
    setNewRecipe(event.target.value);
    console.log(event.target.value);
  };

  const recipesToShow = showAllRecipes ? recipes : recipes.filter((recipe) => recipe.isFavorite);

  return (
    <div>
      <form onSubmit={addRecipe}>
        <input value={newRecipe} onChange={handleRecipeChange} />
        <button type="submit">Create Recipe</button>
      </form>
      <h2>recipes</h2>
      
      {/* <Notification message={errorMessage} /> */}
      <div>
        <button onClick={() => setShowAllRecipes(!showAllRecipes)}>
          show {showAllRecipes ? 'favorite' : 'all'}
        </button>
      </div>
      <ul>
        {recipesToShow.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} toggleFavoriteOf={toggleFavoriteOf} />
        ))}
      </ul>
    </div>
  );
}

export default App;
