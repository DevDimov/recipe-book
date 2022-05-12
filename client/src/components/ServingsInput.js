import { useRef, useEffect } from 'react'
import './inputNumber.css'

const ServingsInput = ({ accessRef }) => {

    const inputRef = useRef()

    useEffect(() => {
        accessRef.current = inputRef.current
    }, [inputRef])

    return (
        <label>
            <h2>Servings</h2>
            <div className="inputNumber">
                <input
                    ref={inputRef}
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

export default ServingsInput