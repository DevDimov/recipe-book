import { useState, useEffect } from 'react'
import './TextArea.css'
import Instruction from './Instruction'
import ButtonTextIcon from './ButtonTextIcon'
import addIcon from '../icons/add_black_48dp.svg'
import closeIcon from '../icons/close_black_48dp.svg'


const TextArea = ({ accessRef }) => {

    const [value, setValue] = useState('')
    const [showPlaceholder, setShowPlaceholder] = useState(true)
    const [method, setMethod] = useState([])

    useEffect(() => {
        let bool = true
        if (value) {
            bool = false
        }
        setShowPlaceholder(bool)
    }, [value])

    useEffect(() => {
        accessRef.current = method
    }, [method])

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const addMethodStep = () => {
        let input = ''
        if (value) {
            input = value.trim()
            if (input.length > 1) {
                const newMethod = [...method, input ]
                setMethod(newMethod)
                setValue('')
            }
        }
    }

    const removeMethodStep = () => {
        let newMethod = method.slice(0, method.length - 1)
        setMethod(newMethod)
    }

    return (
        <div id="TextArea">
            <div id="instruction-container">
                {method.length > 0 && method.map((data, index) => {
                    return (<Instruction
                        key={data.slice(0,10)}
                        step={index+1}
                        text={data}
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
                    required={method.length === 0 ? true : false}
                />
                {showPlaceholder && <div><h2>{method.length + 1 + '.'}</h2></div>}
            </div >
            <div id="buttons-container">
                <ButtonTextIcon
                    type="button"
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