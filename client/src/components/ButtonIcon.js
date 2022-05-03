const ButtonIcon = ({ type, iconPath, handleOnClick }) => {

    return (
        <button
            type={type}
            className="ButtonIcon"
            onClick={handleOnClick}
        >
            <img
                src={iconPath}
                alt=""
            />
        </button>
    )
}

export default ButtonIcon