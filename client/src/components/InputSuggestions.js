import './InputSuggestions.css'

const InputSuggestions = ({ filteredSuggestions, activeSuggestion, setState, inputRef }) => {

    const handleOnClick = (e) => {
        setState({
            userInput: e.currentTarget.innerHTML,
            filteredSuggestions: [],
            activeSuggestion: -1,
            showSuggestions: false,
        })
        inputRef.current.focus()
    }

    return (
        <ul id="InputSuggestions">
            {
                filteredSuggestions.map((suggestion, index) => {
                    let className = '';
                    if (index === activeSuggestion) {
                        className = "selected";
                    }
                    return (
                        <li
                            className={className}
                            key={suggestion}
                            onClick={handleOnClick}
                        >
                            {suggestion}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default InputSuggestions