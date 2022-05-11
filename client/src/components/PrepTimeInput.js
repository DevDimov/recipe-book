import './inputNumber.css'

const PrepTimeInput = () => {

    return (
        <label>
            <h2>Preparation time</h2>
            <div className="inputNumber">
                <input
                    ref={null}
                    type="number"
                    id="prep-time"
                    name="prep-time"
                    min="5"
                    max="90"
                    step="5"
                    defaultValue="5"
                />
                <span>minutes</span>
            </div>
        </label>
    )
}

export default PrepTimeInput