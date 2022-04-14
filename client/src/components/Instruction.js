const Instruction = ({ step, text }) => {

    return (
        <div className="Instruction">
            <h3>{step + '.'}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Instruction