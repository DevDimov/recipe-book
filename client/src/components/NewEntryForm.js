import { useState, useRef } from 'react'
import './NewEntryForm.css'
import InputText from './InputText'
import TextArea from './TextArea'
import UploadRecipeImage from './UploadRecipeImage'

import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'

import { upsertDocument } from '../js/utilities'

const NewEntryForm = ({ toggleForm }) => {

    const [image, setImage] = useState(null)
    const [submitStatus, setSubmitStatus] = useState('')

    const formRef = useRef()
    const nameRef = useRef('')
    const descriptionRef = useRef('')
    const categoryRef = useRef([])
    const prepTimeRef = useRef(0)
    const servingsRef = useRef(0)
    const ingredientsRef = useRef('')
    const methodRef = useRef([])

    const handleSubmit = (e) => {
        e.preventDefault();

        const recipeData = {
            image: image ? image.name : '',
            name: nameRef.current.value.trim(),
            description: descriptionRef.current.value.trim(),
            category: categoryRef.current,
            prepTime: prepTimeRef.current.value,
            servings: servingsRef.current.value,
            ingredients: ingredientsRef.current.value.trim(),
            method: methodRef.current
        }
        console.log('You clicked Submit.', recipeData);

        if (validateInput(recipeData)) {
            // const response = await upsertDocument(recipeData)
            // handleSubmitResponse(response)
            handleSubmitResponse({ upsertedCount: 1 })
        }
    }

    const validateInput = (input) => {
        if (input.image.length === 0) {
            setSubmitStatus('Please upload an image')
            return false
        }
        if (input.name.length === 0) {
            setSubmitStatus('Please add a recipe name')
            return false
        }
        if (input.description.length === 0) {
            setSubmitStatus('Please add a recipe description')
            return false
        }
        if (input.category.length === 0) {
            setSubmitStatus('Please add at least one recipe category')
            return false
        }
        if (input.ingredients.length === 0) {
            setSubmitStatus('Please add at least one recipe category')
            return false
        }
        if (input.method.length === 0) {
            setSubmitStatus('Please add at least one method step')
            return false
        }
        return true
    }

    const handleSubmitResponse = (response) => {
        let newSubRes = ''
        if (response.upsertedCount === 1) {
            newSubRes = "A new recipe has been successfully added"
            resetForm()
        }
        if (response.modifiedCount === 1) {
            newSubRes = "An existing recipe with the same name has been updated"
            resetForm()
        }
        if (response.upsertedCount === 0 && response.modifiedCount === 0) {
            newSubRes = "This recipe name and information has already been added before"
        }
        if (response.err) {
            newSubRes = "An error has occured. Please try again"
        }
        setSubmitStatus(newSubRes)
    }

    const resetForm = () => {
        console.log('You clicked reset form.')
        setImage(null)
        nameRef.current.value = ''
        descriptionRef.current.value = ''
        categoryRef.current.length = 0
        ingredientsRef.current.value = ''
        methodRef.current.length = 0
    }

    const handleCancel = (e) => {
        e.preventDefault();
        console.log('You clicked Cancel.');
        toggleForm()
    }

    return (
        <form ref={formRef} id="new-entry-form" onSubmit={handleSubmit}>

            <UploadRecipeImage
                image={image}
                setImage={setImage}
            />

            <div>
                <label htmlFor="name"><h2>Name</h2></label>
                <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    defaultValue='Test'
                    placeholder="Enter a unique name for your recipe"
                    required
                />
            </div>

            <div>
                <label htmlFor="description"><h2>Description</h2></label>
                <textarea
                    ref={descriptionRef}
                    name="description"
                    rows="5"
                    maxLength="500"
                    defaultValue='Test description'
                    placeholder="Describe your recipe in a few sentences"
                    required
                />
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
                <input
                    ref={prepTimeRef}
                    type="number"
                    id="prep-time"
                    name="prep-time"
                    min="5"
                    max="90"
                    step="5"
                    defaultValue="5"
                    required
                />
            </div>

            <div>
                <label htmlFor="servings"><h2>Servings</h2></label>
                <input
                    ref={servingsRef}
                    type="number"
                    id="servings"
                    name="servings"
                    min="1"
                    max="8"
                    step="1"
                    defaultValue="2"
                    required
                />
            </div>

            <div>
                <label htmlFor="ingredients"><h2>Ingredients</h2></label>
                <textarea
                    ref={ingredientsRef}
                    id="ingredients"
                    name="ingredients"
                    rows="10"
                    maxLength="1000"
                    resize="vertical"
                    defaultValue='Test'
                    required
                />
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

            {
                submitStatus && <p>{submitStatus}</p>
            }

        </form>

    )
}

export default NewEntryForm