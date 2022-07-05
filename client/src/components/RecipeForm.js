import { useState, useRef } from 'react'
import './RecipeForm.css'
import InputMethod from './InputMethod'
import ImageUpload from './ImageUpload'
import { insertDocument, checkDuplicateName } from '../js/mongodb'
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

        const formData = new FormData()
        formData.append('file', image ? image : 'none')
        formData.append('image', image ? image.name : '')
        formData.append('name', nameRef.current.value.trim())
        formData.append('description', descriptionRef.current.value.trim())
        formData.append('category', categoryRef.current)
        formData.append('prepTime', prepTimeRef.current.value)
        formData.append('servings', servingsRef.current.value)
        formData.append('ingredients', ingredientsRef.current.value.trim())
        formData.append('method', methodRef.current)

        const inputValid = await validateInput(formData)
        if (inputValid) {
            setSubmitStatus('Saving recipe...')
            const response = await insertDocument(formData)
            console.log(response)
            handleInsertResponse(response)
            // handleInsertResponse({ upsertedCount: 1 }) // for development
        }
    }

    const validateInput = async (formData) => {

        if (formData.get('file') === 'none') {
            setSubmitStatus('Please upload an image')
            return false
        }
        if (formData.get('name').length === 0) {
            setSubmitStatus('Please add a recipe name')
            return false
        }

        const result = await checkDuplicateName({ name: formData.get('name') })
        if (result.match) {
            setSubmitStatus(`A recipe with the following _id has the same name: ${result._id}`)
            return false
        }

        if (formData.get('description').length === 0) {
            setSubmitStatus('Please add a recipe description')
            return false
        }
        if (formData.get('category').length === 0) {
            setSubmitStatus('Please add at least one recipe category')
            return false
        }
        if (formData.get('ingredients').length === 0) {
            setSubmitStatus('Please add at least one recipe category')
            return false
        }
        if (formData.get('method').length === 0) {
            setSubmitStatus('Please add at least one method step')
            return false
        }
        return true
    }

    const handleInsertResponse = (response) => {
        let newSubRes = ''
        if (response.insertedId) {
            newSubRes = "A new recipe has been successfully added to the database"
            resetForm()
        }
        if (response.error) {
            newSubRes = `An error has occured. ${response.error}`
        }
        setSubmitStatus(newSubRes)
    }

    // const handleSubmitResponse = (response) => {
    //     let newSubRes = ''
    //     if (response.upsertedCount === 1) {
    //         newSubRes = "A new recipe has been successfully added"
    //         resetForm()
    //     }
    //     if (response.modifiedCount === 1) {
    //         newSubRes = "An existing recipe with the same name has been updated"
    //         resetForm()
    //     }
    //     if (response.upsertedCount === 0 && response.modifiedCount === 0) {
    //         newSubRes = "This recipe name and information has already been added before"
    //     }
    //     if (response.err) {
    //         newSubRes = "An error has occured. Please try again"
    //     }
    //     setSubmitStatus(newSubRes)
    // }

    const resetForm = () => {
        setImage(null)
        nameRef.current.value = ''
        descriptionRef.current.value = ''
        categoryRef.current.length = 0
        ingredientsRef.current.value = ''
        methodRef.current.length = 0
    }

    const handleCancel = (e) => {
        e.preventDefault();
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
                            // defaultValue='Test'
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
                            // defaultValue='Test description'
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
                            // defaultValue='Test'
                        />
                    </label>

                    <InputMethod accessRef={methodRef} />
                    <ButtonContained text="Save" handleOnClick={handleSubmit} />
                    <ButtonText text="Cancel" handleOnClick={handleCancel} />
                    <Alert text={submitStatus} />

                </form>
            </div>
        </div>
    )
}

export default RecipeForm