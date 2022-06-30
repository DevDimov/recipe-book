import searchIcon from '../../icons/search.svg'

const SearchButton = ({ handleOnClick }) => {

    return (
        <button
            type="button"
            id="searchButton"
            className="IconButton"
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