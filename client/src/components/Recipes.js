import './Recipes.css'
import RecipeCard from './RecipeCard'

const Recipes = ({ data }) => {

    return (
        <div className="recipes">
            {
                data.length > 0 ?
                    <>
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
                    </> : <p>No recipes to display</p>
            }
        </div>
    )
}

export default Recipes