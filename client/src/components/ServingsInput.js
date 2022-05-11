import './inputNumber.css'

const PrepTimeInput = () => {

    return (
        <label>
            <h2>Servings</h2>
            <div className="inputNumber">
                <input
                    ref={null}
                    type="number"
                    id="servings"
                    name="servings"
                    min="1"
                    max="8"
                    step="1"
                    defaultValue="2"
                    required
                />
                <span>people</span>
            </div>
        </label>
    )
}

export default PrepTimeInput