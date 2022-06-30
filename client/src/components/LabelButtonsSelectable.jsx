import { useState, useEffect } from "react"
import LabelButtonSelectable from "../components/buttons/LabelButtonSelectable"

const LabelButtonsSelectable = ({ headerName, accessRef }) => {

    const [labels, setLabels] = useState([])
    const [selected, setSelected] = useState([])

    const onSelect = (e) => {
        const checked = e.currentTarget.checked
        const newValue = e.currentTarget.value
        if (checked) {
            setSelected([...selected, newValue])
            // accessRef.current.push(newValue)
        }
        else {
            let newSelected = selected.filter(element => element !== newValue)
            setSelected(newSelected)
            // accessRef.current = accessRef.current.filter(element => element !== newValue)
        }
    }

    useEffect(() => {
        accessRef.current = selected
    }, [selected])

    useEffect(() => {
        // add call to database
        setLabels(['Breakfast', 'Desert', 'High-Protein', 'Main meal', 'Snack', 'Vegetarian', 'Vegan'])
    }, [])

    return (
        <div>
            <h2>{headerName}</h2>
            <div className="categories-container">
                {labels.map((name) => {
                    let disabled = selected.length === 3 && !selected.includes(name)
                    return (
                        <LabelButtonSelectable
                            key={name}
                            text={name}
                            onSelect={onSelect}
                            disabled={disabled}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default LabelButtonsSelectable