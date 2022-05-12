import IconButton from './buttons/IconButton'
import closeIcon from '../icons/close.svg'
import './ImagePreview.css'

const ImagePreview = ({ src, onCloseImagePreview }) => {

    const style = {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    return (
        <div className="squareContainer">
            <div
                className="recipeImagePreview"
                style={style}
            />
            <IconButton 
                type="button"
                iconPath={closeIcon}
                handleOnClick={onCloseImagePreview}
            />
        </div>
    )
}

export default ImagePreview