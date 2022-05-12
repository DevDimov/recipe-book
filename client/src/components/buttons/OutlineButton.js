const OutlineButton = ({ type, text, iconPath, handleOnClick }) => {

    return (
        <button
            type={type}
            className="OutlineButton"
            onClick={handleOnClick}
        >
            {text}
            {iconPath && <img src={iconPath} alt="" />}
        </button>
    )
}

export default OutlineButton