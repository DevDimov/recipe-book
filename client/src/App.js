import './App.css';
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import AddNewRecipe from './components/AddNewRecipe'

function App() {
    return (
        <div className="App">
            <Header />
            <SearchBar />
            <AddNewRecipe />
        </div>
    );
}

export default App;
