import { useRef } from 'react'
import InputPrepTime from './InputPrepTime'
import InputServings from './InputServings'
import './SearchFilters.css'
import LabelButtonsSelectable from './LabelButtonsSelectable'
import InputWord from './InputWord'
import ButtonContained from './buttons/ButtonContained'
import ButtonText from './buttons/ButtonText'

const SearchFilters = ({ toggleSearchFilters }) => {

    const categoryRef = useRef([])
    const prepTimeRef = useRef(0)
    const servingsRef = useRef(0)
    const ingredientRef = useRef('')

    const onSearch = () => {
        const filters = {
            category: categoryRef.current,
            prepTime: prepTimeRef.current.value,
            servings: servingsRef.current.value,
            ingredientMatch: ingredientRef.current.trim()
        }
        console.log(filters)
    }

    return (
        <div className="centered">
            <form 
                id="search-filters"
                className="popup-container"
                name="search-filters"
                >
                <LabelButtonsSelectable
                    headerName="Category"
                    accessRef={categoryRef}
                />
                <InputPrepTime accessRef={prepTimeRef} />
                <InputServings accessRef={servingsRef} />
                <InputWord
                    headerName="Ingredient"
                    labelName="Must contain"
                    accessRef={ingredientRef}
                />
                <ButtonContained
                    text="Search"
                    handleOnClick={onSearch}
                />
                <ButtonText
                    customId="button-cancel"
                    text="Close"
                    handleOnClick={toggleSearchFilters}
                />
            </form>
        </div>
    )
}

export default SearchFilters