import { useEffect, useState, useRef } from 'react'
import './App.css';
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import AddNewRecipe from './components/AddNewRecipe'
import Recipes from './components/Recipes';

function App() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch('./testData/twoRecipes.json')
            .then(res => res.json())
            .then(data => setRecipes(data))
    }, [])

    // const getLatestRecipes = async () => {
    //     const response = await fetch('./testData/twoRecipes.json')
    //     const newRecipes = await response.json()
    //     setRecipes(newRecipes)
    // }

    return (
        <>
            <Header />
            <div className="app">
                <SearchBar
                    setRecipes={setRecipes}
                />
                <Recipes data={recipes} />
                <AddNewRecipe />
            </div>
        </>
    );
}

export default App;
