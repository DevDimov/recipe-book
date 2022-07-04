const ButtonOutlined = ({ text, iconPath, handleOnClick }) => {

    return (
        <button
            type="button"
            className="button button--outlined"
            onClick={handleOnClick}
        >
            {text}
            {iconPath && <img src={iconPath} alt="" />}
        </button>
    )
}

export default ButtonOutlined