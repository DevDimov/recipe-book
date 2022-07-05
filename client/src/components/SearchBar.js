import { useState, useRef } from 'react'
import './SearchBar.css'
import TuneButton from './buttons/TuneButton'
import SearchButton from './buttons/SearchButton'
import SearchFilters from './SearchFilters'
import { searchByName } from '../js/mongodb'

const SearchBar = ({ setRecipes }) => {

    const [searchFilters, setSearchFilters] = useState(false)

    const inputRef = useRef()

    const search = async () => {
        const userInput = inputRef.current.value.trim()
        if (userInput.length > 2) {

            const data = await searchByName({ name: userInput })
            if (data) {
                setRecipes(data)
            }
            else {
                setRecipes([])
                console.log({ error: 'error', searchInput: userInput })
            }
        }
    }

    const onKeyDown = (e) => {
        // User pressed the enter key
        const userInput = inputRef.current.value.trim().length
        if (e.keyCode === 13 && userInput > 2) search()
    }

    const toggleSearchFilters = () => { setSearchFilters(!searchFilters) }

    return (
        <div className="search">
            <div className="search-bar">
                <input
                    className="search-bar__input"
                    ref={inputRef}
                    type="text"
                    placeholder="Search recipes"
                    maxLength="100"
                    onKeyDown={onKeyDown}
                />
                <div className="search-buttons">
                    <TuneButton handleOnClick={toggleSearchFilters} />
                    <SearchButton handleOnClick={search} />
                </div>
            </div>
            {searchFilters ?
                <SearchFilters
                    toggleSearchFilters={toggleSearchFilters}
                    setRecipes={setRecipes}
                />
                : null
            }
        </div>
    )
}

export default SearchBar