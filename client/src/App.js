import { useEffect, useState, useRef } from 'react'
import './App.css';
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import RecipeSubmit from './components/RecipeSubmit'
import Recipes from './components/Recipes';

function App() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch('./testData/fiveRecipes.json')
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
                <RecipeSubmit />
            </div>
        </>
    );
}

export default App;
