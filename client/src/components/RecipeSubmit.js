import { useState } from 'react';
import IconButton from './buttons/IconButton';
import RecipeForm from './RecipeForm';
import addIcon from '../icons/add_white.svg'

const RecipeSubmit = () => {

    const [showForm, setShowForm] = useState(false)

    const toggleForm = () => { setShowForm(!showForm) }

    return (
        <>
            {
                showForm ? <RecipeForm toggleForm={toggleForm} /> :
                    <IconButton customId="add-button" iconPath={addIcon} handleOnClick={toggleForm} />
            }
        </>
    )
}

export default RecipeSubmit