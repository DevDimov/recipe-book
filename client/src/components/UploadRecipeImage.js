import { useState } from 'react'
import './UploadRecipeImage.css'
import ButtonTextIcon from './ButtonTextIcon'
import uploadIcon from '../icons/file_upload_black_48dp.svg'
import ImagePreview from './ImagePreview'

const UploadRecipeImage = ({ imageRef }) => {

    const [image, setImage] = useState(null)

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

    const onCloseImagePreview = (e) => {
        e.preventDefault();
        setImage(null)
    }

    return (
        <div className="UploadRecipeImage">
            {
                image !== null ?
                    <ImagePreview
                        src={URL.createObjectURL(image)}
                        onCloseImagePreview={onCloseImagePreview}
                    />
                    :
                    <div className="imageUpload">
                        <ButtonTextIcon
                            type="button"
                            text="Upload image"
                            iconPath={uploadIcon}
                        />
                        <input
                            ref={imageRef}
                            type="file"
                            id="imageUpload"
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

export default UploadRecipeImage

