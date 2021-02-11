import React from 'react';
import Button from '../FormElements/Button';
import Input from '../FormElements/Input';
import './NewDieselForm.css';

const NewForm = () => {

    const placeSubmitHandler = async event => {
        event.preventDefault();

        console.log("test");
    }
    

    return (
        <React.Fragment>
            <form className="diesel-form" onSubmit={placeSubmitHandler}>
                <Input
                    id="turatie"
                    element="input"
                    type="text"
                    label="Turatie"
                />
                <Button type="submit">FINALIZEAZA</Button>
            </form>
        </React.Fragment>
    )
}

export default NewForm;