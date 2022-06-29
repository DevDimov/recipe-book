import { useRef } from 'react'
import './ImageUpload.css'
import OutlineButton from './buttons/OutlineButton'
import uploadIcon from '../icons/file_upload.svg'
import ImagePreview from './ImagePreview'

const ImageUpload = ({ image, setImage }) => {

    const imageRef = useRef()

    const selectImage = (e) => {
        e.preventDefault();
        let file = imageRef.current.files
        let newImage = null
        if (file.length > 0) {
            if (file[0].type.startsWith('image/')) {
                newImage = file[0]
            }
            else {
                console.log('Please upload an image file in jpg format.')
            }
        }
        setImage(newImage)
    }

    const onClosePreview = (e) => {
        e.preventDefault();
        setImage(null)
    }

    return (
        <div className="image-upload">
            {
                image !== null ?
                    <ImagePreview
                        src={URL.createObjectURL(image)}
                        handleOnClose={onClosePreview}
                    />
                    :
                    <div className="button--image-upload">
                        <OutlineButton
                            text="Upload image"
                            iconPath={uploadIcon}
                        />
                        <input
                            ref={imageRef}
                            type="file"
                            name="filename"
                            className="custom-file-input"
                            accept=".jpg,.jpeg"
                            onChange={selectImage}
                        />
                    </div>
            }
        </div>
    )
}

export default ImageUpload

