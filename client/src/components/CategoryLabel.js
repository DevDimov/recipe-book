import './CategoryLabel.css'
import close from '../icons/close.svg'

const CategoryLabel = ({ text, onRemove }) => {

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

export default CategoryLabel