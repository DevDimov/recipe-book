import { useState, useRef } from 'react'
import PrepTimeInput from './PrepTimeInput'
import ServingsInput from './ServingsInput'
import './SearchFilters.css'
import LabelButtonsSelectable from './LabelButtonsSelectable'
import InputWord from './InputWord'
import PrimaryButton from './buttons/PrimaryButton'


const SearchFilters = () => {

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
        <form id="SearchFilters" name="searchFilters">
            <LabelButtonsSelectable
                headerName="Category"
                accessRef={categoryRef}
            />
            <PrepTimeInput accessRef={prepTimeRef} />
            <ServingsInput accessRef={servingsRef} />
            <InputWord
                headerName="Ingredient"
                labelName="Must contain"
                accessRef={ingredientRef}
            />
            <PrimaryButton 
                text="Search"
                handleOnClick={onSearch}
            />
        </form>

    )
}

export default SearchFilters