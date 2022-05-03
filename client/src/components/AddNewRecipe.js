import { useState } from 'react';
import AddButton from './AddButton';
import NewEntryForm from './NewEntryForm';

const AddNewRecipe = () => {

    const [showForm, setShowForm] = useState(false)

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    return (
        <>
            {
                showForm ?
                    <NewEntryForm
                        toggleForm={toggleForm}
                    />
                    :
                    <AddButton
                        toggleForm={toggleForm}
                    />

            }
        </>
    )
}

export default AddNewRecipe