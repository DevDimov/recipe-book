import './InputCategoryLabel.css'
import close from '../icons/close.svg'

const InputCategoryLabel = ({ text, onRemove }) => {

    return (
        <div className="CategoryLabel">
            {text}
            <button onClick={() => onRemove(text)}>
                <img
                    src={close}
                    alt=""
                />
            </button>
        </div>
    )
}

export default InputCategoryLabel