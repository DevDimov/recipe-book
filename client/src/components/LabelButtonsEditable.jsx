import CategoryLabel from "./CategoryLabel"

const LabelButtonsEditable = ({ array, onRemove }) => {

    return (
        <div className="categories-container">
            {array.map((name) => {
                return (
                    <CategoryLabel
                        key={name}
                        text={name}
                        onRemove={onRemove}
                    />
                )
            })}
        </div>
    )
}

export default LabelButtonsEditable