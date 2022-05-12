import { useState, useEffect, useRef } from 'react'
import './CategoryInput.css'

import InputSuggestions from './InputSuggestions'
import AddOutlineButton from './buttons/AddOutlineButton'
import LabelButtonsEditable from './LabelButtonsEditable'


const CategoryInput = ({ accessRef }) => {

    const [suggestions, setSuggestions] = useState([])
    const [categories, setCategories] = useState([])

    const [state, setState] = useState({
        userInput: '',
        filteredSuggestions: [],
        activeSuggestion: -1,
        showSuggestions: false
    })

    const inputRef = useRef()

    useEffect(() => {
        // add database call
        setSuggestions(['Breakfast', 'Desert', 'High-Protein', 'Main meal', 'Snack', 'Vegetarian', 'Vegan'])
    }, [])

    useEffect(() => {
        accessRef.current = categories
    }, [categories])

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        let re = new RegExp(userInput, 'i');
        let matches = suggestions.filter(suggestion => suggestion.search(re) > -1)
        setState({
            userInput: userInput,
            filteredSuggestions: matches,
            activeSuggestion: -1,
            showSuggestions: true
        })
    }

    const onAdd = () => {
        const input = state.userInput.trim()
        if (input) {
            let newCategories = []
            let match = false
            for (const category of categories) {
                if (category.toLowerCase() === input.toLowerCase()) {
                    match = true
                    break
                }
                else {
                    newCategories.push(category)
                }
            }
            if (!match) {
                newCategories.push(input)
                setCategories(newCategories)
                setState({ ...state, userInput: '' })
            }
        }
    }

    const onRemove = (categoryName) => {
        let newCategories = categories.filter(category => category !== categoryName)
        setCategories(newCategories)
    }

    return (
        <div>
            <label htmlFor="categoryInput">
                <h2>Category</h2>
            </label>

            <LabelButtonsEditable array={categories} onRemove={onRemove} />

            <div className="input-container">
                <input
                    ref={inputRef}
                    type="text"
                    id="categoryInput"
                    maxLength="40"
                    onChange={onChange}
                    value={state.userInput}
                />
                <AddOutlineButton handleOnClick={onAdd} />
            </div>


            {
                state.showSuggestions && state.userInput && state.filteredSuggestions &&
                <InputSuggestions
                    filteredSuggestions={state.filteredSuggestions}
                    activeSuggestion={state.activeSuggestion}
                    setState={setState}
                    inputRef={inputRef}
                />
            }

        </div >
    )
}

export default CategoryInput