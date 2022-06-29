import './Recipes.css'
import RecipeCard from './RecipeCard'

const Recipes = ({ data }) => {

    return (
        <div className="recipes">
            {
                data.map((item) => {
                    return (
                        <RecipeCard
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