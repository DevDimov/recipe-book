import './ButtonSecondary.css'

const ButtonSecondary = ({ type, text, handleOnClick }) => {

    return (
        <button
            type={type}
            className="ButtonSecondary"
            onClick={handleOnClick}
        >
            {text}
        </button>
    )
}

export default ButtonSecondary