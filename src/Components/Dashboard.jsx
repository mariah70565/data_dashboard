import React, { useState, useEffect } from 'react';
import TypeFilter from './TypeFilter';
import List from "../Components/List";

const API_KEY = "db19e029289049be90ba0c2cd1fbd1cf";

const Dashboard = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [avgProtein, setAvgProtein] = useState(0);
    const [minSugar, setMinSugar] = useState(0);

    const calculateStats = () => {
        let totalProtein = 0;
        let totalSugar = Number.MAX_VALUE; // Initialize with max value to find minimum
    
        // Iterate over filteredRecipes and accumulate values
        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];
            if (recipe.nutrition && recipe.nutrition.nutrients) {
                for (let j = 0; j < recipe.nutrition.nutrients.length; j++) {
                    const nutrient = recipe.nutrition.nutrients[j];
                    if (nutrient.name === "Protein") {
                        totalProtein += nutrient.amount;
                    } else if (nutrient.name === "Sugar") {
                        totalSugar = Math.min(totalSugar, nutrient.amount);
                    }
                }
            }
        }
    
        // Calculate average protein
        const avgProteinValue = filteredRecipes.length > 0 ? (totalProtein / filteredRecipes.length).toFixed(3) : 0;
        setAvgProtein(avgProteinValue);
    
        // Set minimum sugar
        const minSugarValue = totalSugar !== Number.MAX_VALUE ? totalSugar.toFixed(3) : 0;
        setMinSugar(minSugarValue);
    };

    useEffect(() => {
        // Calculate statistics whenever filteredRecipes changes
        calculateStats();
    }, [filteredRecipes]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleFilter = async (type) => {
        // Toggle the selected type
        const updatedSelectedTypes = selectedTypes.includes(type)
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];
    
        setSelectedTypes(updatedSelectedTypes);
    
        // Fetch data based on updated selected types
        const typeParam = updatedSelectedTypes.join(',');
        const apiURL = `https://api.spoonacular.com/recipes/complexSearch?number=100&&maxSugar=20&minProtein=5&apiKey=${API_KEY}&type=${typeParam}`;
    
        const response = await fetch(apiURL);
        const json = await response.json();
    
        if (json && json.results) {
            setFilteredRecipes(json.results);
            console.log("API url: ", apiURL);
        } else {
            console.error("Invalid API response:", json);
        }
    };

    useEffect(() => {
        // Filter recipes based on search term and selected types
        const filteredResults = data.results.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(recipe.type);
            return matchesSearch && matchesType;
        });
        setFilteredRecipes(filteredResults);
        console.log("filteredrecipes: ", filteredRecipes);
    }, [data.results, searchTerm, selectedTypes]);

    return (
        <div className='main-page'>

            <div className='sidebar'>
                <h3>Filter by Dish Type:</h3>
                <TypeFilter handleFilter={handleFilter}/>
            </div>

            <div className='recipe-list'>
                <div className='results-summary'>
                    <h3>{`Showing ${filteredRecipes.length} recipes`}</h3>
                    <h3>{`Sugar count range: ${minSugar} grams - 20 grams`}</h3>
                    <h3>{`Average protein count: ${avgProtein} grams`}</h3>
                </div>
                <div className='search-bar'>
                    <input type='text' placeholder='Search for a recipe...' value={searchTerm} onChange={handleSearch}></input>
                </div>
                <List filteredRecipes={filteredRecipes}/>
            </div>
            
        </div>
    )
}

export default Dashboard;