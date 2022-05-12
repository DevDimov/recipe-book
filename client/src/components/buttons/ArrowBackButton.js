import './IconTextButton.css'
import arrowBack from '../../icons/arrow_back.svg'

const ArrowBackButton = ({ handleOnClick }) => {

    return (
        <button
            type="button"
            id="arrowBackButton"
            className="IconTextButton"
            onClick={handleOnClick}
        >
            <img
                src={arrowBack}
                alt=""
            />
            <span>Back</span>
        </button>
    )
}

export default ArrowBackButton