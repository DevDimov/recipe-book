import { useState, useRef } from 'react'
import './RecipeForm.css'
import InputMethod from './InputMethod'
import ImageUpload from './ImageUpload'
import { upsertDocument } from '../js/utilities'
import Alert from './Alert'
import InputPrepTime from './InputPrepTime'
import InputServings from './InputServings'
import InputCategory from './InputCategory'
import ButtonContained from './buttons/ButtonContained'
import ButtonText from './buttons/ButtonText'
import arrowBack from '../icons/arrow_back.svg'

const RecipeForm = ({ toggleForm }) => {

    const [image, setImage] = useState(null)
    const [submitStatus, setSubmitStatus] = useState('')

    const nameRef = useRef('')
    const descriptionRef = useRef('')
    const categoryRef = useRef([])
    const prepTimeRef = useRef(0)
    const servingsRef = useRef(0)
    const ingredientsRef = useRef('')
    const methodRef = useRef([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = {
            image: image ? image.name : '',
            name: nameRef.current.value.trim(),
            description: descriptionRef.current.value.trim(),
            category: categoryRef.current,
            prepTime: parseInt(prepTimeRef.current.value),
            servings: parseInt(servingsRef.current.value),
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
        <div className="centered">
            <div className="popup-container">

                <ButtonText
                    customId="button-arrow-back"
                    text="Back"
                    handleOnClick={handleCancel}
                    imagePath={arrowBack}
                />

                <form id="newEntryForm" name="newEntryForm">

                    <ImageUpload image={image} setImage={setImage} />

                    <label>
                        <h2>Name</h2>
                        <input
                            ref={nameRef}
                            type="text"
                            name="name"
                            defaultValue='Test'
                            placeholder="Enter a unique name for your recipe"
                        />
                    </label>

                    <label>
                        <h2>Description</h2>
                        <textarea
                            ref={descriptionRef}
                            name="description"
                            rows="5"
                            maxLength="500"
                            defaultValue='Test description'
                            placeholder="Describe your recipe in a few sentences"
                            required
                        />
                    </label>

                    <InputCategory accessRef={categoryRef} />
                    <InputPrepTime accessRef={prepTimeRef} />
                    <InputServings accessRef={servingsRef} />

                    <label>
                        <h2>Ingredients</h2>
                        <textarea
                            ref={ingredientsRef}
                            id="ingredients"
                            name="ingredients"
                            rows="10"
                            maxLength="1000"
                            resize="vertical"
                            defaultValue='Test'
                        />
                    </label>

                    <InputMethod accessRef={methodRef} />
                        <ButtonContained text="Save" handleOnClick={handleSubmit} />
                        <ButtonText customId="button-cancel" text="Cancel" handleOnClick={handleCancel} />
                    <Alert text={submitStatus} />

                </form>
            </div>
        </div>
    )
}

export default RecipeForm