const OutlineButton = ({ text, iconPath, handleOnClick }) => {

    return (
        <button
            type="button"
            className="OutlineButton"
            onClick={handleOnClick}
        >
            {text}
            {iconPath && <img src={iconPath} alt="" />}
        </button>
    )
}

export default OutlineButton