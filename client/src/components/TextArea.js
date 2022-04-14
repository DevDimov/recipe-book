import { useState, useEffect } from 'react'
import './TextArea.css'
import Instruction from './Instruction'
import ButtonTextIcon from './ButtonTextIcon'
import addIcon from '../icons/add_black_48dp.svg'
import closeIcon from '../icons/close_black_48dp.svg'


const TextArea = () => {

    const [value, setValue] = useState('')
    const [showPlaceholder, setShowPlaceholder] = useState(true)
    const [stepCount, setStepCount] = useState(1)
    const [method, setMethod] = useState([])

    useEffect(() => {
        let bool = true
        if (value) {
            bool = false
        }
        setShowPlaceholder(bool)
    }, [value])

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const addMethodStep = () => {
        let input = ''
        if (value) {
            input = value.trim()
            if (input.length > 1) {
                const newMethod = [...method, { step: stepCount, text: input }]
                setMethod(newMethod)
                let newStepCount = stepCount + 1
                setStepCount(newStepCount)
                setValue('')
            }
        }
    }

    const removeMethodStep = () => {
        let newMethod = method.slice(0, method.length - 1)
        setMethod(newMethod)
        let newStepCount = stepCount - 1
        setStepCount(newStepCount)
    }

    return (
        <div id="TextArea">
            <div id="instruction-container">
                {method.length > 0 && method.map((data) => {
                    return (<Instruction
                        key={data.step}
                        step={data.step}
                        text={data.text}
                    />)
                })}
            </div>
            <div className="textarea-container" >
                <textarea
                    name="method-textarea"
                    rows="5"
                    maxLength="500"
                    onChange={handleOnChange}
                    value={value}
                    required={stepCount === 1 ? true : false}
                />
                {showPlaceholder && <div><h2>{stepCount + '.'}</h2></div>}
            </div >
            <div id="buttons-container">
                <ButtonTextIcon
                    text='Add'
                    iconPath={addIcon}
                    handleOnClick={addMethodStep}
                />
                {method.length > 0 && <ButtonTextIcon
                    text='Remove last'
                    iconPath={closeIcon}
                    handleOnClick={removeMethodStep}
                />}
            </div>
        </div>
    )
}

export default TextArea