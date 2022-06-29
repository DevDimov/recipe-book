const GhostButton = ({ customId, text, handleOnClick, imagePath }) => {

    // return (
    //     <button
    //         type="button"
    //         className="GhostButton"
    //         onClick={handleOnClick}
    //     >
    //         {text}
    //     </button>
    // )

    return (
        <button
            type="button"
            id={customId}
            className="button button--ghost"
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

export default GhostButton