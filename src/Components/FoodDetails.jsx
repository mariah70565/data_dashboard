import React from 'react';
import { useLocation } from 'react-router-dom';

const FoodDetails = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const id = queryParams.get('id');
    const name = queryParams.get('name');
    const sugar = queryParams.get('sugar');
    const protein = queryParams.get('protein');
    const calories = queryParams.get('calories');
    const fat = queryParams.get('fat');
    const saturatedFat = queryParams.get('saturatedFat');
    const sodium = queryParams.get('sodium');
    const fiber = queryParams.get('fiber');
    const calcium = queryParams.get('calcium');

    return (
        <div className='food-details'>
            <h2>NUTRITION FACTS</h2>
            <h3>{name}</h3>
            <p>Sugar: {sugar} g</p>
            <p>Protein: {protein} g</p>
            <p>Calories: {calories} kcal</p>
            <p>Fat: {fat} g</p>
            <p>Saturated Fat: {saturatedFat} g</p>
            <p>Sodium: {sodium} mg</p>
            <p>Fiber: {fiber} g</p>
            <p>Calcium: {calcium} mg</p>
        </div>
    );
};

export default FoodDetails;