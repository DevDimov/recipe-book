import './Recipe.css'
import OutlineButton from './buttons/OutlineButton'

const Recipe = ({ handleOnClose, data }) => {

    return (
        <div className="centered">
            <div className="popup-container">
                <div className="recipe">
                    <img
                        className="card-recipe__image"
                        src={`./images/${data.image}`}
                        alt=""
                    />
                    <h1 className="card-recipe__name">{data.name}</h1>
                    <h2 className="">Ingredients</h2>
                    <p className="card-recipe__name">{data.ingredients}</p>
                    <h2 className="">Method</h2>
                    <p className="">{data.method[0]}</p>
                    {/* <p className="card-recipe__description">{data.description}</p>
            <div className="card-recipe__tags">
                <h3>{data.category[0].toUpperCase()}</h3>
                <h3>{`${data.prepTime} MINS`}</h3>
                <h3>{`SERVES ${data.servings}`}</h3>
            </div> */}
                    {/* <OutlineButton
                        text="Back"
                        // iconPath={addIcon}
                        handleOnClick={handleOnClose}
                    /> */}
                    <button onClick={handleOnClose}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Recipe