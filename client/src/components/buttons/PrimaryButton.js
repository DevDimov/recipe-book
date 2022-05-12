import './PrimaryButton.css'

const PrimaryButton = ({ text, handleOnClick }) => {

    return (
        <button
            type="button"
            className="PrimaryButton"
            onClick={handleOnClick}
        >
            {text}
        </button>
    )
}

export default PrimaryButton