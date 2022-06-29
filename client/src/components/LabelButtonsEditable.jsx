import InputCategoryLabel from "./InputCategoryLabel"

const LabelButtonsEditable = ({ array, onRemove }) => {

    return (
        <div className="categories-container">
            {array.map((name) => {
                return (
                    <InputCategoryLabel
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