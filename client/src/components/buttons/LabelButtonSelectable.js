import './LabelButtonSelectable.css'

const LabelButtonSelectable = ({ text, onSelect }) => {

    return (
        <div className="labelButtonContainer">
            <input
                type="checkbox"
                id={text}
                value={text}
                onChange={onSelect}
            >
            </input >
            <label
                htmlFor={text}
                className="LabelButtonSelectable"
            >
                {text}
            </label>
        </div>
    )
}

export default LabelButtonSelectable