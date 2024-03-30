import React from 'react';//, { useState, useEffect } from 'react'
// import TypeFilter from './TypeFilter';
// const API_KEY = "0bfbf2c2fd39421e831c0ba6ada2fb52";//import.meta.env.VITE_APP_API_KEY;

const List = ({filteredRecipes}) => {

    // const filteredRecipes = data.results.filter(filterRecipes);
    // const typeParam = getTypeParam();
    // const apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}${typeParam}`

    return (
        // <div className='container'>
        <div className='recipe-list'>
            {filteredRecipes.map(recipe => (
                <div className='recipe-card' key={recipe.id}>
                    <img src={recipe.image}/>
                    <h3>{recipe.title}</h3>
                </div>
            ))}
        </div>
    );
};
  
export default List;