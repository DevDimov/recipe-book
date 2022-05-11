import './ButtonIcon.css'
import './SearchButton.css'
import searchIcon from '../../icons/search.svg'

const SearchButton = ({ handleOnClick }) => {

    return (
        <button
            type="button"
            id="searchButton"
            className="ButtonIcon"
            onClick={handleOnClick}
        >
            <img
                id="searchIcon"
                src={searchIcon}
                alt=""
            />
        </button>
    )
}

export default SearchButton