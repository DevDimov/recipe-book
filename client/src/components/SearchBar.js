import { useEffect, useState, useRef } from 'react'
import './SearchBar.css'
import TuneButton from './buttons/TuneButton'
import SearchButton from './buttons/SearchButton'
import SearchFilters from './SearchFilters'
import { searchByName } from '../js/utilities'
// import searchIcon from "../images/search-icon.svg"
// import StatusInfo from "./StatusInfo";
// import infoIcon from "../images/info-icon.svg"
// import { SearchSuggestions } from "./SearchSuggestions";

const SearchBar = ({ lang, langValue, getWeather, locations, suggestions, searchError, setRecipes }) => {

    const [state, setState] = useState({
        userInput: '',
        filteredSuggestions: [],
        activeSuggestion: 0,
        showSuggestions: false
    })
    const [searchStatus, setSearchStatus] = useState('')

    const [searchFilters, setSearchFilters] = useState(false)

    const inputRef = useRef()

    // useEffect(() => {
    //     setSearchStatus('')
    //     setState({ ...state, userInput: '' })
    // }, [locations])

    // useEffect(() => {
    //     setSearchStatus(searchError)
    // }, [searchError])

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        // let re = new RegExp(userInput, 'i');
        // let matches = suggestions.filter((city) => (city.search(re) > -1))
        let matches = 'N/A'
        setState({
            userInput: userInput,
            filteredSuggestions: matches,
            activeSuggestion: 0,
            showSuggestions: true
        })
    }

    const onKeyDown = (e) => {
        const { activeSuggestion, filteredSuggestions } = state

        // User pressed the enter key
        if (e.keyCode === 13) {
            if (filteredSuggestions.length) {
                setState({
                    userInput: filteredSuggestions[activeSuggestion],
                    filteredSuggestions: [],
                    activeSuggestion: 0,
                    showSuggestions: false
                })
            }
            else {
                search()
            }
        }

        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return
            }
            setState({ ...state, activeSuggestion: activeSuggestion - 1 })
        }

        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                return
            }
            setState({ ...state, activeSuggestion: activeSuggestion + 1 })
        }
    }

    const search = async () => {
        const userInput = inputRef.current.value.trim()
        console.log(userInput)
        if (userInput.length > 2) {
            // setSearchStatus(`Searching for recipes related to ${state.userInput}`)
            const data = await searchByName({ name: userInput })
            if (data) {
                setRecipes(data)
            }
            else {
                // setSearchStatus(`${data.statusText}, ${data.status}`)
                setRecipes({ error: 'error', searchInput: userInput })
            }
        }
    }

    const prepareQuery = () => {
        const recipeData = {
            // image: image ? image.name : '',
            // name: nameRef.current.value.trim(),
            // description: descriptionRef.current.value.trim(),
            // category: categoryRef.current,
            // prepTime: prepTimeRef.current.value,
            // servings: servingsRef.current.value,
            // ingredients: ingredientsRef.current.value.trim(),
            // method: methodRef.current
        }
    }

    const toggleSearchFilters = () => {
        setSearchFilters(!searchFilters)
    }

    return (
        <div className="flex-center-column">
            <div className="SearchBar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search recipes"
                    maxLength="100"
                // onChange={onChange}
                // onKeyDown={onKeyDown}
                // value={state.userInput}
                />
                <div className="inputButtons">
                    <TuneButton handleOnClick={toggleSearchFilters} />
                    <SearchButton handleOnClick={search} />
                </div>


                {/* {
                    state.showSuggestions && state.userInput && state.filteredSuggestions &&
                    <SearchSuggestions
                        filteredSuggestions={state.filteredSuggestions}
                        activeSuggestion={state.activeSuggestion}
                        setState={setState}
                        inputRef={inputRef}
                    />
                } */}
            </div>
            {
                searchFilters &&
                <SearchFilters toggleSearchFilters={toggleSearchFilters} />
            }
            {/* {searchStatus && <StatusInfo
                text={searchStatus}
                icon={infoIcon}
            />} */}
        </div>
    )
}

export default SearchBar