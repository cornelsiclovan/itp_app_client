import React, { useEffect, useState } from 'react';
import Button from '../FormElements/Button';
import Input from '../FormElements/Input';
import './NewDieselForm.css';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../UIElements/LoadingSpinner';

import {
    VALIDATOR_REQUIRE
} from '../utils/validators';
import { useHttpClient } from '../hooks/http-hook';
import { useForm } from '../hooks/form-hook';

const NewDieselForm = () => {
    const [loadedData, setLoadedData] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    let { k_m, ral_rpm, reg_rpm, tbaza_s } = useParams();

    const [formState, inputHandler, setFormData] = useForm(
        {
            k_m : {
                value: '',
                isValid: false
            },
            ral_rpm: {
                value: '',
                isValid: false
            },
            reg_rpm: {
                value: '',
                isValid: false
            },
            tbaza_s: {
                value: '',
                isValid: false
            }
        }, false);
    
    useEffect(() => {
        const setDataToForm = async () => {
            setLoadedData(k_m);
            setFormData(
                {
                    k_m: {
                        value: k_m,
                        isValid: true
                    },
                    ral_rpm: {
                        value: ral_rpm,
                        isValid: true
                    },
                    reg_rpm: {
                        value: reg_rpm,
                        isValid: true
                    },
                    tbaza_s: {
                        value: tbaza_s,
                        isValid: true
                    }
                }
            )
        };

        setDataToForm();
    }, [sendRequest, k_m, setFormData]);

    const dataSubmitHandler = async event => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('k_m', formState.inputs.k_m.value);

            await sendRequest()
        } catch(err){}
    }
    
    
    if(isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if(!loadedData && error) {
        return (
            <div className="center">
                <h2>Could not find data</h2>
            </div>
        );
    }


    return (
        <React.Fragment>
            { !isLoading && loadedData && 
            <form className="gas-form" onSubmit={dataSubmitHandler}>
                <Input
                    id="ral_rpm"
                    element="input"
                    type="text"
                    label="ral_rpm"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={ral_rpm}
                    initialValid={true}
                />
                <Input
                    id="reg_rpm"
                    element="input"
                    type="text"
                    label="reg_rpm"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={reg_rpm}
                    initialValid={true}
                />
                <Input
                    id="tbaza_s"
                    element="input"
                    type="text"
                    label="tbaza_s"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={tbaza_s}
                    initialValid={true}
                />
                <Input
                    id="k_m"
                    element="input"
                    type="text"
                    label="k_m"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={k_m}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>FINALIZEAZA</Button>
            </form>
            }
        </React.Fragment>
    )
}

export default NewDieselForm;