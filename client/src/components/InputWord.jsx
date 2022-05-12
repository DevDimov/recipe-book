import { useState, useRef } from 'react'
import './InputWord.css'

const InputWord = ({ headerName, labelName, accessRef }) => {

    return (
        <div className="InputWord">
            <h2>{headerName}</h2>
            <label>
                <span>{labelName}</span>
                <input
                    type="text"
                    maxLength="40"
                    onChange={(e) => accessRef.current = e.currentTarget.value}
                />
            </label>
        </div>
    )
}

export default InputWord