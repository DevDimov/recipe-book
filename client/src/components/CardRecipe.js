import { useState } from 'react'
import './CardRecipe.css'
import Recipe from './Recipe'

const CardRecipe = ({ data }) => {

    const [showRecipe, setShowRecipe] = useState(false)

    const handleOnClose = () => setShowRecipe(false)

    return (
        <>
            <div className="card-recipe">
                <button className="card-recipe__button" onClick={() => setShowRecipe(true)}>
                    <img
                        className="card-recipe__image"
                        src={`./images/${data.image}`}
                        alt=""
                    />
                    <h2 className="card-recipe__name">{data.name}</h2>
                    <p className="card-recipe__description">{data.description}</p>
                    <div className="card-recipe__tags">
                        <h3>{data.category[0].toUpperCase()}</h3>
                        <h3>{`${data.prepTime} MINS`}</h3>
                        <h3>{`SERVES ${data.servings}`}</h3>
                    </div>
                </button>
            </div>
            {showRecipe ? <Recipe handleOnClose={handleOnClose} data={data} /> : null}
        </>
    )
}

export default CardRecipe