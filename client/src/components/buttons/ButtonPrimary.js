import './ButtonPrimary.css'

const ButtonPrimary = ({ type, text, handleOnClick }) => {

    return (
        <button
            type={type}
            className="ButtonPrimary"
            onClick={handleOnClick}
        >
            {text}
        </button>
    )
}

export default ButtonPrimary