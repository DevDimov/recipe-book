import './CardRecipe.css'

const CardRecipe = () => {
    return (
        <div className="card-recipe">
            <img
                className="card-recipe__image"
                src='./images/one-pan-pasta.jpg'
                alt=""
            />
            <h2 className="card-recipe__title">Martha's One Pan Pasta</h2>
            <p className="card-recipe__description">
                This one-pot-wonder sees both pasta and sauce cooked together resulting in perfectly al dente spaghetti and 50% less washing up!
            </p>
            <div className="card-recipe__tags">
                <h3>MAIN MEAL</h3>
                <h3>15 MINS</h3>
                <h3>SERVES 2</h3>
            </div>
        </div>
    )
}

export default CardRecipe