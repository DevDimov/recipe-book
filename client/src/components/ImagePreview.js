import './ImagePreview.css'
import IconButton from './buttons/IconButton'
import closeIcon from '../icons/close.svg'

const ImagePreview = ({ src, handleOnClose }) => {

    const style = {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    return (
        <div className="image-preview">
            <div style={style} />
            {
                handleOnClose && <IconButton
                    iconPath={closeIcon}
                    handleOnClick={handleOnClose}
                />
            }
        </div>
    )
}

export default ImagePreview