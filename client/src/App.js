import './App.css';
import Header from './components/Header'
import AddButton from './components/AddButton';
import NewEntryForm from './components/NewEntryForm';

function App() {
  return (
    <div className="App">
        <Header />
        <AddButton />
        <NewEntryForm />
    </div>
  );
}

export default App;
