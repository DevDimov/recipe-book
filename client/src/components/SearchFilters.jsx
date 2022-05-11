import { useState } from 'react'
import PrepTimeInput from './PrepTimeInput'
import ServingsInput from './ServingsInput'
import './SearchFilters.css'


const SearchFilters = () => {



    return (
        <form id="SearchFilters" name="searchFilters">
            <h2>Category</h2>

            <PrepTimeInput />

            <ServingsInput />

            <h2>Ingredients</h2>
        </form>

    )
}

export default SearchFilters