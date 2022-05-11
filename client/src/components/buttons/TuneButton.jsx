import './ButtonIconClear.css'
import './TuneButton.css'
import tuneIcon from '../../icons/tune.svg'

const TuneButton = ({ handleOnClick }) => {

    return (
        <button
            type="button"
            id="tuneButton"
            className="ButtonIconClear"
            onClick={handleOnClick}
        >
            <img
                id="tuneIcon"
                src={tuneIcon}
                alt=""
            />
        </button>
    )
}

export default TuneButton