import { useEffect, useState, useRef } from 'react'
import './App.css';
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import AddNewRecipe from './components/AddNewRecipe'

function App() {

    const [recipes, setRecipes] = useState({test: 'test'})

    return (
        <div className="App">
            <Header />
            <div className="App-container">
                <SearchBar
                    setRecipes={setRecipes}
                />
                <AddNewRecipe />
            </div>
        </div>
    );
}

export default App;
