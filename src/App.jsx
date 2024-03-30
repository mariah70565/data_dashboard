import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from "./Components/Dashboard"
// import TypeFilter from './Components/TypeFilter';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null)
  // const [selectedTypes, setSelectedTypes] = useState('');

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch("https://api.spoonacular.com/recipes/complexSearch?number=100&maxSugar=20&minProtein=5&apiKey=" + API_KEY);
      const json = await response.json();
      setList(json);
    };
    
    fetchAllCoinData().catch(console.error);
  }, []);

  // const handleFilter = (type) => {
  //   // Toggle the selected type
  //   if (selectedTypes.includes(type)) {
  //     setSelectedTypes(selectedTypes.filter(t => t !== type));
  //   } else {
  //     setSelectedTypes([...selectedTypes, type]);
  //   }
  // };


  console.log("list: ", list);

  return (
    <>
      <h1 className='title'>Recipe Dashboard</h1>
      <h2 className='about'>Up to 27 cuisines to choose from!</h2>

      {/* <div className='Sidebar'>
      {list && <TypeFilter handleFilter={setSelectedTypes}/>}
      </div> */}

      <div className='Dashboard'>
      {list && <Dashboard data={list}/>}
      </div>
    </>
  )
}

export default App