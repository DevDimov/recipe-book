import './CardRecipe.css'

const CardRecipe = ({ data }) => {
    console.log('Rendered')
    return (
        <div className="card-recipe">
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
        </div>
    )
}

export default CardRecipe