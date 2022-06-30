import { useState, useEffect } from 'react'
import './InputMethod.css'
import InputMethodStep from './InputMethodStep'
import ButtonOutlined from './buttons/ButtonOutlined'
import addIcon from '../icons/add.svg'
import closeIcon from '../icons/close.svg'

const InputMethod = ({ accessRef }) => {

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

    const addMethodStep = (e) => {
        e.preventDefault()
        let input = ''
        if (value) {
            input = value.trim()
            if (input.length > 1) {
                const newMethod = [...method, input]
                setMethod(newMethod)
                setValue('')
            }
        }
    }

    const removeMethodStep = (e) => {
        e.preventDefault()
        let newMethod = method.slice(0, method.length - 1)
        setMethod(newMethod)
    }

    return (
        <div id="MethodInput">

            <label>

                <h2>Method</h2>

                <div id="instruction-container">
                    {method.length > 0 && method.map((data, index) => {
                        return (<InputMethodStep
                            key={data.slice(0, 10)}
                            step={index + 1}
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

            </label>

            <div id="buttons-container">

                <ButtonOutlined
                    text="Add"
                    iconPath={addIcon}
                    handleOnClick={addMethodStep}
                />

                {method.length > 0 &&
                    <ButtonOutlined
                        text='Remove last'
                        iconPath={closeIcon}
                        handleOnClick={removeMethodStep}
                    />
                }

            </div>

        </div>
    )
}

export default InputMethod