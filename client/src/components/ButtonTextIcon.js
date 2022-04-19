import './ButtonTextIcon.css'

const ButtonTextIcon = ({ type, text, iconPath, handleOnClick }) => {

    return (
        <button
            type={type}
            className="ButtonTextIcon"
            onClick={handleOnClick}
        >
            {text}
            <img
                src={iconPath}
                alt=""
            />
        </button>
    )
}

export default ButtonTextIcon