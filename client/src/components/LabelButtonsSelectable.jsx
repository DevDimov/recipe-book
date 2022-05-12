import { useState, useEffect } from "react"
import LabelButtonSelectable from "../components/buttons/LabelButtonSelectable"

const LabelButtonsSelectable = ({ headerName, accessRef }) => {

    const [labels, setLabels] = useState([])

    const onSelect = (e) => {
        const checked = e.currentTarget.checked
        const newValue = e.currentTarget.value
        if (checked) {
            accessRef.current.push(newValue)
        }
        else {
            accessRef.current = accessRef.current.filter(element => element !== newValue)
        }
    }

    useEffect(() => {
        setLabels(['Breakfast', 'Desert', 'High-Protein', 'Main meal', 'Snack', 'Vegetarian', 'Vegan'])
    }, [])

    return (
        <div>
            <h2>{headerName}</h2>
            <div className="categories-container">
                {labels.map((name) => {
                    return (
                        <LabelButtonSelectable
                            key={name}
                            text={name}
                            onSelect={onSelect}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default LabelButtonsSelectable