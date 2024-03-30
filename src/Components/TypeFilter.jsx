import React from 'react'

const TypeFilter = ( {handleFilter}) => {
    const options = ['Main Course', 'Side Dish', 'Dessert', 'Appetizer', 'Salad', 'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Marinade', 'Fingerfood', 'Snack', 'Drink'];

    return (
        <div>
            {/* <h2>Filter by Dish Type:</h2> */}
            {options.map(option => (
                <div key={option}>
                    <input type='checkbox' value={option} onChange={() => handleFilter(option)}></input>
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}
        </div>
    );
};

export default TypeFilter;