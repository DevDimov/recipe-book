const IconButton = ({ customId, iconPath, handleOnClick }) => {

    return (
        <button
            type="button"
            id={customId}
            className="IconButton"
            onClick={handleOnClick}
        >
            <img
                src={iconPath}
                alt=""
            />
        </button>
    )
}

export default IconButton