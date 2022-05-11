import './Alert.css'

const Alert = ({ text }) => {
    return (
        <div className="alert">
            <p>{text}</p>
        </div>
    )
}

export default Alert