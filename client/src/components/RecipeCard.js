import { useEffect, useState } from 'react'
import './RecipeCard.css'
import Recipe from './Recipe'
import ImagePreview from './ImagePreview'
import { s3GetImage } from '../js/s3'

const RecipeCard = ({ data }) => {

    const [showRecipe, setShowRecipe] = useState(false)
    const [image, setImage] = useState('')

    const handleOnClose = () => setShowRecipe(false)

    useEffect(() => {
        const fetchImage = async () => {
            const objectKey = data._id + "_" + data.image
            const newImage = await s3GetImage(objectKey)
            setImage(newImage)
        }
        fetchImage()
    }, [data])

    return (
        <>
            <div className="card card--recipe">
                <button
                    className="button button--card"
                    onClick={() => setShowRecipe(true)}
                >
                    <ImagePreview src={image ? image : `./images/pending-image.jpg`} />
                    <h2 className="card-recipe__title">{data.name}</h2>
                    <p className="card-recipe__supporting-text">{data.description}</p>
                    <div className="card-recipe__tags">
                        <h3>{data.category[0].toUpperCase()}</h3>
                        <h3>{`${data.prepTime} MINS`}</h3>
                        <h3>{`SERVES ${data.servings}`}</h3>
                    </div>
                </button>
            </div>
            {showRecipe ?
                <Recipe
                    handleOnClose={handleOnClose}
                    data={data}
                    image={image}
                />
                : null
            }
        </>
    )
}

export default RecipeCard