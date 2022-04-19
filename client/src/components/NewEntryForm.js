import { useState, useRef } from 'react'
import './NewEntryForm.css'
import InputText from './InputText'
import TextArea from './TextArea'
import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'
import ButtonTextIcon from './ButtonTextIcon'
import uploadIcon from '../icons/file_upload_black_48dp.svg'

const NewEntryForm = () => {

    const imageRef = useRef('')
    const nameRef = useRef('')
    const categoryRef = useRef([])
    const prepTimeRef = useRef(0)
    const servingsRef = useRef(0)
    const ingredientsRef = useRef('')
    const methodRef = useRef([])

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = {
            image: imageRef.current.value,
            name: nameRef.current.value,
            category: categoryRef.current,
            prepTime: prepTimeRef.current.value,
            servings: servingsRef.current.value,
            ingredients: ingredientsRef.current.value,
            method: methodRef.current
        }
        console.log('You clicked Submit.', recipeData);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        console.log('You clicked Cancel.');
    }

    const handleOnUploadPhoto = (e) => {
        e.preventDefault();
        console.log('You clicked Upload photo.');
    }

    return (
        <form id="new-entry-form" onSubmit={handleSubmit}>

            <ButtonTextIcon
                type="button"
                text="Upload image"
                iconPath={uploadIcon}
                handleOnClick={handleOnUploadPhoto}
            />

            <div>
                <label htmlFor="recipeName"><h2>Name</h2></label>
                <input ref={nameRef} type="text" name="recipeName" defaultValue='Test' required />
            </div>

            <div>
                <h2>Category</h2>
                <InputText
                    accessRef={categoryRef}
                    suggestions={['Breakfast', 'Desert', 'High-Protein', 'Main meal', 'Snack', 'Vegetarian', 'Vegan']}
                />
            </div>

            <div>
                <label htmlFor="prep-time"><h2>Preparation time</h2></label>
                <input ref={prepTimeRef} type="number" id="prep-time" name="prep-time" min="5" max="90" step="5" defaultValue="5" required />
            </div>

            <div>
                <label htmlFor="servings"><h2>Servings</h2></label>
                <input ref={servingsRef} type="number" id="servings" name="servings" min="1" max="8" step="1" defaultValue="2" required />
            </div>

            <div>
                <label htmlFor="ingredients"><h2>Ingredients</h2></label>
                <textarea ref={ingredientsRef} id="ingredients" name="ingredients" rows="10" maxLength="1000" resize="vertical" defaultValue='Test' required />
            </div>

            <div>
                <h2>Method</h2>
                <TextArea accessRef={methodRef} />
            </div>

            <ButtonPrimary
                type="submit"
                text="Save"
                handleOnClick={handleSubmit}
            />
            <ButtonSecondary
                type="button"
                text="Cancel"
                handleOnClick={handleCancel}
            />

        </form>

    )
}

export default NewEntryForm