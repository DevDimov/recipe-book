const IconButton = ({ type, iconPath, handleOnClick }) => {

    return (
        <button
            type={type}
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