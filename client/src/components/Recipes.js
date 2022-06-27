import './Recipes.css'
import CardRecipe from './CardRecipe'

const Recipes = ({ data }) => {

    return (
        <div className="recipes">
            {
                data.map((item) => {
                    return (
                        <CardRecipe
                            key={item._id}
                            data={item}
                        />
                    )
                })
            }
        </div>
    )
}

export default Recipes