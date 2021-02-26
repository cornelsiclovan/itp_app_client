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
    let { filename, k_m, ral_rpm, reg_rpm, tbaza_s } = useParams();


    const [formState, inputHandler, setFormData] = useForm(
        {
            k_m : {
                value: '',
                isValid: true
            },
            ral_rpm: {
                value: '',
                isValid: true
            },
            reg_rpm: {
                value: '',
                isValid: true
            },
            tbaza_s: {
                value: '',
                isValid: true
            }
        });
    
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
                }, true
            )
        };

        setDataToForm();
    }, [k_m, setFormData]);

    const dataSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5001/api/smoke/${filename}`, 
            'PATCH', 
            JSON.stringify({
                k_m: formState.inputs.k_m.value,
                ral_rpm: formState.inputs.ral_rpm.value,
                reg_rpm: formState.inputs.reg_rpm.value,
                tbaza_s: formState.inputs.tbaza_s.value
                
            }), {'Content-Type': 'application/json'}
            );
 
        } catch(err) {}
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
                    disabled={true}
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