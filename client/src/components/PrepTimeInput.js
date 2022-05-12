import { useRef, useEffect } from 'react'
import './inputNumber.css'

const PrepTimeInput = ({ accessRef }) => {

    const inputRef = useRef()

    useEffect(() => {
        accessRef.current = inputRef.current
    }, [inputRef])

    return (
        <label>
            <h2>Preparation time</h2>
            <div className="inputNumber">
                <input
                    ref={inputRef}
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