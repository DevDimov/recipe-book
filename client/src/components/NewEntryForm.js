import './NewEntryForm.css'

const NewEntryForm = () => {
    return (
        <form id="new-entry-form">
            <button>Upload photo</button>

            <label for="name"><h2>Name</h2></label>
            <input type="text" id="name" name="name" required/>


            <h2>Category</h2>
            <option>Breakfast</option>
            <option>Desert</option>

            <label for="prep-time"><h2>Preparation time</h2></label>
            <input type="number" id="prep-time" name="prep-time" min="5" max="90" step="5" value="5" required/>
            
            <label for="servings"><h2>Servings</h2></label>
            <input type="number" id="servings" name="servings" min="1" max="8" step="1" value="2" required/>
            
            <label for="ingredients"><h2>Ingredients</h2></label>
            <textarea id="ingredients" name="ingredients" rows="10" maxlength="1000" resize="vertical" required/>
            
            <h2>Method</h2>

        </form>

    )
}

export default NewEntryForm