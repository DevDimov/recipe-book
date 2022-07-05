import { useState, useEffect, useRef } from 'react'
import './InputCategory.css'

import InputSuggestions from './InputSuggestions'
import ButtonOutlined from './buttons/ButtonOutlined'
import LabelButtonsEditable from './LabelButtonsEditable'
import addIcon from '../icons/add.svg'

const InputCategory = ({ accessRef }) => {

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
        setSuggestions(['Breakfast', 'Desert', 'High-Protein', 'Main meal', 'Snack', 'Vegetarian', 'Vegan', 'Pasta', 'Burger', 'Rice'])
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

    const onAdd = (e) => {
        e.preventDefault()
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
                if (newCategories.length < 3) inputRef.current.focus()
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
                    placeholder="Add up to three categories related to your recipe"
                    disabled={categories.length >= 3 ? true : false}
                />
                <ButtonOutlined
                    text="Add"
                    iconPath={addIcon}
                    handleOnClick={onAdd}
                />
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

export default InputCategory