import './ButtonTextIcon.css'

const ButtonTextIcon = ({ text, iconPath, handleOnClick }) => {

    return (
        <button
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