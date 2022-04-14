import './NewEntryForm.css'
import InputText from './InputText'
import TextArea from './TextArea'

const NewEntryForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('You clicked submit.');
    }

    return (
        <form
            id="new-entry-form"
            onSubmit={handleSubmit}
        >
            <button>Upload photo</button>

            <div>
                <label htmlFor="recipeName"><h2>Name</h2></label>
                <input type="text" name="recipeName" defaultValue='Test' required />
            </div>

            <div>
                <h2>Category</h2>
                <InputText
                    suggestions={['Breakfast', 'Desert', 'High-Protein', 'Main meal', 'Snack', 'Vegetarian', 'Vegan']}
                />
            </div>

            <div>
                <label htmlFor="prep-time"><h2>Preparation time</h2></label>
                <input type="number" id="prep-time" name="prep-time" min="5" max="90" step="5" defaultValue="5" required />
            </div>

            <div>
                <label htmlFor="servings"><h2>Servings</h2></label>
                <input type="number" id="servings" name="servings" min="1" max="8" step="1" defaultValue="2" required />
            </div>

            <div>
                <label htmlFor="ingredients"><h2>Ingredients</h2></label>
                <textarea id="ingredients" name="ingredients" rows="10" maxLength="1000" resize="vertical" defaultValue='Test' required />
            </div>

            <div>
                <h2>Method</h2>
                <TextArea />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>

    )
}

export default NewEntryForm