import './ButtonTextIcon.css'
import addIcon from '../../icons/add.svg'

const AddOutlineButton = ({ handleOnClick }) => {

    return (
        <button
            type="button"
            className="ButtonTextIcon"
            onClick={handleOnClick}
        >
            Add
            <img
                src={addIcon}
                alt=""
            />
        </button>
    )
}

export default AddOutlineButton