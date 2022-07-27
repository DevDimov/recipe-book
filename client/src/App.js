import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import RecipeSubmit from './components/RecipeSubmit'
import Recipes from './components/Recipes';

function App() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        // fetch('./testData/twoRecipes.json') // for debugging
        fetch('/recipes/10')
            .then(res => res.json())
            .then(data => setRecipes(data))
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [])

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
