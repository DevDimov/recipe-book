const ButtonText = ({ customId, text, handleOnClick, imagePath }) => {

    return (
        <button
            type="button"
            id={customId}
            className="button button--text"
            onClick={handleOnClick}
        >
            {imagePath && <img
                src={imagePath}
                alt=""
            />}
            {text}
        </button>
    )
}

export default ButtonText