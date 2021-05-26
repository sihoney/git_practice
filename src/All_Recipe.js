/* --------------- App --------------- */
import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
    const API_ID = '12f51da4';
    const API_KEY = '16809e2ffc4983e7cc943bd487637ce5';

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');

    useEffect(()=>{
        getRecipes();
    }, [query])

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
        const data = await response.json();
        setRecipes(data.hits);
    } 

    const updateSearch = e => {
        setSearch(e.target.value);
        console.log(search)
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return(
        <div className='App'>
            <form onSubmit={getSearch} className='search-form'>
                <input
                    onChange={updateSearch}
                    value={search}
                    className='search-bar' 
                    type='text' />
                <button className='search-button' type='submit'>
                    Search
                </button>
            </form>
            <div className='recipes'>
                {
                    recipes.map(
                        recipe => (
                        <Recipe 
                            key = {recipe.recipe.label}
                            title={recipe.recipe.label} 
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredients}/>)
                    )
                }
            </div>
        </div>
    )
}

export default App;

/* --------------- Recipe --------------- */

import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h3>Title: {title}</h3>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>calories: {Math.floor(calories)}</p>
            <img className={style.image} src={image} alt='' />
        </div>
    )
}

export default Recipe;