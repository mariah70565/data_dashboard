import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({ recipeData }) => {
  // Calculate total protein and total sugar
  let totalProtein = 0;
  let totalSugar = 0;

  recipeData.forEach(recipe => {
    if (recipe.nutrition && recipe.nutrition.nutrients) {
      recipe.nutrition.nutrients.forEach(nutrient => {
        if (nutrient.name === 'Protein') {
          totalProtein += nutrient.amount;
        } else if (nutrient.name === 'Sugar') {
          totalSugar += nutrient.amount;
        }
      });
    }
  });

  // Prepare data for pie chart
  const data = {
    labels: ['Protein', 'Sugar'],
    datasets: [{
      data: [totalProtein, totalSugar],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };
  console.log("Chart data:", data);

  return (
    <div>
      <h3>Nutrient Distribution in Recipes</h3>
      <Pie data={data} />
    </div>
  );
};

export default Chart;