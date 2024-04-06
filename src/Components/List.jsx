import React from 'react';//, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import TypeFilter from './TypeFilter';
// const API_KEY = "0bfbf2c2fd39421e831c0ba6ada2fb52";//import.meta.env.VITE_APP_API_KEY;

const List = ({filteredRecipes}) => {

    const getNutrientAmount = (recipe, nutrientName) => {
        const nutrient = recipe.nutrition?.nutrients.find(nutrient => nutrient.name === nutrientName);
        return nutrient ? nutrient.amount : 0;
    };

    return (
        // <div className='container'>
        <div className='recipe-list'>
            {filteredRecipes.map(recipe => (
                <Link to={`/food-details?id=${recipe.id}&name=${encodeURIComponent(recipe.title)}&sugar=${getNutrientAmount(recipe, 'Sugar')}&protein=${getNutrientAmount(recipe, 'Protein')}&calories=${getNutrientAmount(recipe, 'Calories')}&fat=${getNutrientAmount(recipe, 'Fat')}&saturatedFat=${getNutrientAmount(recipe, 'Saturated Fat')}&sodium=${getNutrientAmount(recipe, 'Sodium')}&fiber=${getNutrientAmount(recipe, 'Fiber')}&calcium=${getNutrientAmount(recipe, 'Calcium')}`} key={recipe.id}>
                    <div className='recipe-card' key={recipe.id}>
                        <img src={recipe.image}/>
                        <h3>{recipe.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
};
  
export default List;