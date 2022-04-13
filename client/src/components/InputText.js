import { useState, useRef } from 'react'
import './InputText.css'

import addIcon from '../icons/add_black_48dp.svg'
import ButtonTextIcon from './ButtonTextIcon'
import InputSuggestions from './InputSuggestions'
import CategoryLabel from './CategoryLabel'


const InputText = ({ suggestions }) => {

    const [state, setState] = useState({
        userInput: '',
        filteredSuggestions: [],
        activeSuggestion: -1,
        showSuggestions: false
    })

    const [categories, setCategories] = useState([])

    const inputRef = useRef()

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

    return (
        <div className="flex-center-column">
            
            <div id="categories-container">
                {categories.map((category) => {
                    return (
                        <CategoryLabel
                            key={category}
                            text={category}
                        />
                    )
                })}
            </div>

            <div className="input-container">
                <input
                    ref={inputRef}
                    type="text"
                    className=""
                    maxLength="40"
                    onChange={onChange}
                    value={state.userInput}
                />
                <ButtonTextIcon
                    text="Add"
                    iconPath={addIcon}
                    handleOnClick={onAdd}
                />
            </div>

            <div id="suggestions-container">
                {
                    state.showSuggestions && state.userInput && state.filteredSuggestions &&
                    <InputSuggestions
                        filteredSuggestions={state.filteredSuggestions}
                        activeSuggestion={state.activeSuggestion}
                        setState={setState}
                        inputRef={inputRef}
                    />
                }
            </div>

        </div >

    )
}

export default InputText