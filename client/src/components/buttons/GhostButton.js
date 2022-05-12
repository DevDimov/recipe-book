const GhostButton = ({ text, handleOnClick }) => {

    return (
        <button
            type="button"
            className="GhostButton"
            onClick={handleOnClick}
        >
            {text}
        </button>
    )
}

export default GhostButton