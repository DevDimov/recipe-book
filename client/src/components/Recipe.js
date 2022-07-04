import './Recipe.css'
import ButtonOutlined from './buttons/ButtonOutlined'
import ImagePreview from './ImagePreview'
import arrowBack from '../icons/arrow_back.svg'
import Tag from './Tag'
import ButtonText from './buttons/ButtonText'

const Recipe = ({ handleOnClose, data, image }) => {

    return (
        <div className="centered">
            <div className="popup-container">
                <div className="recipe">

                    <ButtonText
                        customId="button-arrow-back"
                        text="Back"
                        handleOnClick={handleOnClose}
                        imagePath={arrowBack}
                    />

                    <ImagePreview src={image ? image : `./images/pending-image.jpg`} />

                    <div>
                        <h1>{data.name}</h1>
                        <div className="tag-container">
                            {
                                data.category.map((name) => {
                                    return (
                                        <Tag text={name} key={name} />
                                    )
                                })
                            }
                            <Tag text={`${data.prepTime} mins`} key={`${data.prepTime} mins`} />
                            <Tag text={`Serves ${data.servings}`} key={`Serves ${data.servings}`} />
                        </div>
                        <p className="recipe__section-body">{data.description}</p>
                    </div>

                    <div>
                        <h2 className="recipe__section-header">Ingredients</h2>
                        <p className="recipe__section-ingredients">{data.ingredients}</p>
                    </div>

                    <div>
                        <h2 className="recipe__section-header">Method</h2>
                        {
                            data.method.map((step, index) => {
                                return (
                                    <div key={index + 1}>
                                        <h3>{`${index + 1}.`}</h3>
                                        <p className="recipe__section-body">{step}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <ButtonOutlined
                        text="Close"
                        handleOnClick={handleOnClose}
                    />

                </div>
            </div>
        </div>
    )
}

export default Recipe