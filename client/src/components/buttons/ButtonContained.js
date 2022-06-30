const ButtonContained = ({ text, handleOnClick }) => {

    return (
        <button
            type="button"
            className="button button--contained"
            onClick={handleOnClick}
        >
            {text}
        </button>
    )
}

export default ButtonContained