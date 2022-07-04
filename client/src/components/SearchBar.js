import { useState, useRef } from 'react'
import './SearchBar.css'
import TuneButton from './buttons/TuneButton'
import SearchButton from './buttons/SearchButton'
import SearchFilters from './SearchFilters'
import { searchByName } from '../js/mongodb'

const SearchBar = ({ setRecipes }) => {

    // const [state, setState] = useState({
    //     userInput: ''
    // })
    // const [searchStatus, setSearchStatus] = useState('')

    const [searchFilters, setSearchFilters] = useState(false)

    const inputRef = useRef()

    // useEffect(() => {
    //     setSearchStatus(searchError)
    // }, [searchError])

    // const onChange = (e) => {
    //     const userInput = e.currentTarget.value;
    //     // let re = new RegExp(userInput, 'i');
    //     // let matches = suggestions.filter((city) => (city.search(re) > -1))
    //     let matches = 'N/A'
    //     setState({
    //         userInput: userInput,
    //         filteredSuggestions: matches,
    //         activeSuggestion: 0,
    //         showSuggestions: true
    //     })
    // }

    // For future use when implementing search suggestions
    // const onKeyDown = (e) => {
    //     const { activeSuggestion, filteredSuggestions } = state

    //     // User pressed the enter key
    //     if (e.keyCode === 13) {
    //         if (filteredSuggestions.length) {
    //             setState({
    //                 userInput: filteredSuggestions[activeSuggestion],
    //                 filteredSuggestions: [],
    //                 activeSuggestion: 0,
    //                 showSuggestions: false
    //             })
    //         }
    //         else {
    //             search()
    //         }
    //     }

    //     // User pressed the up arrow
    //     else if (e.keyCode === 38) {
    //         if (activeSuggestion === 0) {
    //             return
    //         }
    //         setState({ ...state, activeSuggestion: activeSuggestion - 1 })
    //     }

    //     // User pressed the down arrow
    //     else if (e.keyCode === 40) {
    //         if (activeSuggestion + 1 === filteredSuggestions.length) {
    //             return
    //         }
    //         setState({ ...state, activeSuggestion: activeSuggestion + 1 })
    //     }
    // }

    const search = async () => {
        const userInput = inputRef.current.value.trim()
        if (userInput.length > 2) {

            // setSearchStatus(`Searching for recipes related to ${state.userInput}`)
            const data = await searchByName({ name: userInput })
            if (data) {
                setRecipes(data)
            }
            else {
                // setSearchStatus(`${data.statusText}, ${data.status}`)
                console.log({ error: 'error', searchInput: userInput })
            }
        }
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