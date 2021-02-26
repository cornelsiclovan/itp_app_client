import React, { useEffect, useState } from 'react';
import Input from '../FormElements/Input';
import Button from '../FormElements/Button';
import LoadingSpinner from '../UIElements/LoadingSpinner';

import { useHttpClient } from '../hooks/http-hook';
import { useForm } from '../hooks/form-hook';

import { VALIDATOR_REQUIRE } from '../utils/validators';

import './NewGasForm.css';
import { useParams } from 'react-router-dom';

const NewGasForm = () => {
    const [loadedData, setLoadedData] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let { type, id, filename, tur_rpm_1, tur_rpm_2, temp_c_1, temp_c_2 } = useParams();

    let disabled = true;

    const dataSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5001/api/gas/${filename}`, 
            'PATCH', 
            JSON.stringify({
                lambda_1: formState.inputs.lambda_1.value,
                lambda_2: formState.inputs.lambda_2.value,
                hc_1: formState.inputs.hc_1.value,
                hc_2: formState.inputs.hc_2.value,
                o2_1: formState.inputs.o2_1.value,
                o2_2: formState.inputs.o2_2.value,
                co2_1: formState.inputs.co2_1.value,
                co2_2: formState.inputs.co2_2.value,
                co_1: formState.inputs.co_1.value,
                co_2: formState.inputs.co_2.value,
                coc_1: formState.inputs.coc_1.value,
                coc_2: formState.inputs.coc_2.value,
                afr_1: formState.inputs.afr_1.value,
                afr_2: formState.inputs.afr_2.value,
                tur_rpm_1: formState.inputs.tur_rpm_1.value,
                tur_rpm_2: formState.inputs.tur_rpm_2.value,
                temp_c_1: formState.inputs.temp_c_1.value,
                temp_c_2: formState.inputs.temp_c_2.value
            }), {'Content-Type': 'application/json'}
            );

            
        } catch(err) {}
    }

    const [formState, inputHandler, setFormData] = useForm({
        lambda_1: {
            value: '',
            isValid: true
        },
        lambda_2: {
            value: '',
            isValid: true
        },
        hc_1: {
            value: '',
            isValid: true
        },
        hc_2: {
            value: '',
            isValid: true
        },
        o2_1: {
            value: '',
            isValid: true
        },
        o2_2: {
            value: '',
            isValid: true
        },
        co2_1: {
            value: '',
            isValid: true
        },
        co2_2: {
            value: '',
            isValid: true
        },
        co_1: {
            value: '',
            isValid: true
        },
        co_2: {
            value: '',
            isValid: true
        },
        coc_1: {
            value: '',
            isValid: true
        },
        coc_2: {
            value: '',
            isValid: true
        },
        afr_1: {
            value: '',
            isValid: true
        },
        afr_2: {
            value: '',
            isValid: true
        },
        tur_rpm_1: {
            value: '',
            isValid: true
        },
        tur_rpm_2: {
            value: '',
            isValid: true
        },
        temp_c_1: {
            value: '',
            isValid: true
        },
        temp_c_2: {
            value: '',
            isValid: true
        }
    }); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5001/api/gas/${type}/${id}`);
                setLoadedData(responseData);   
    
                setFormData({
                    lambda_1: {
                        value: responseData.lambda_1,
                        isValid: true,
                        disabled: true
                    },
                    lambda_2: {
                        value: responseData.lambda_2,
                        isValid: true
                    },
                    hc_1: {
                        value: responseData.hc_1,
                        isValid: true
                    },
                    hc_2: {
                        value: responseData.hc_2,
                        isValid: true
                    },
                    o2_1: {
                        value: responseData.o2_1,
                        isValid: true
                    },
                    o2_2: {
                        value: responseData.o2_2,
                        isValid: true
                    },
                    co2_1: {
                        value: responseData.co2_1,
                        isValid: true
                    },
                    co2_2: {
                        value: responseData.co2_2,
                        isValid: true
                    },
                    co_1: {
                        value: responseData.co_1,
                        isValid: true
                    },
                    co_2: {
                        value: responseData.co_2,
                        isValid: true
                    },
                    coc_1: {
                        value: responseData.coc_1,
                        isValid: true
                    },
                    coc_2: {
                        value: responseData.coc_2,
                        isValid: true
                    },
                    afr_1: {
                        value: responseData.afr_1,
                        isValid: true
                    },
                    afr_2: {
                        value: responseData.afr_2,
                        isValid: true
                    },
                    tur_rpm_1: {
                        value: tur_rpm_1,
                        isValid: true
                    },
                    tur_rpm_2: {
                        value: tur_rpm_2,
                        isValid: true
                    },
                    temp_c_1: {
                        value: temp_c_1,
                        isValid: true
                    },
                    temp_c_2: {
                        value: temp_c_2,
                        isValid: true
                    }
                }, true);
            } catch (err) {console.log(err)}
        };
        fetchData();
    }, [sendRequest, type, id, setFormData]);

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

    const enableForm = async event => {
        disabled = !disabled;
        setFormData({
            lambda_1: {
                disabled: false
            }
        });
        console.log(disabled)
    }

    //console.log("loadedDAta", loadedData);
    return (
        <React.Fragment>
            { !isLoading && loadedData && 
            <form className="gas-form" onSubmit={dataSubmitHandler}>
                <div className="row">
                    <div className="column" onClick={enableForm}>
                        <Input
                            id="lambda_1"
                            element="input"
                            type="text"
                            label="Lambda 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.lambda_1}
                            initialValid={true}
                            disabled={false}
                        />
                    </div>
                    <div className="column">
                        <Input
                            id="lambda_2"
                            element="input"
                            type="text"
                            label="Lambda 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.lambda_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">    
                        <Input
                            id="hc_1"
                            element="input"
                            type="text"
                            label="Hc 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.hc_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">    
                        <Input
                            id="hc_2"
                            element="input"
                            type="text"
                            label="Hc 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.hc_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Input
                            id="o2_1"
                            element="input"
                            type="text"
                            label="O2 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.o2_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">
                        <Input
                            id="o2_2"
                            element="input"
                            type="text"
                            label="O2 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.o2_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Input
                            id="co2_1"
                            element="input"
                            type="text"
                            label="CO2 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.co2_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">
                         <Input
                            id="co2_2"
                            element="input"
                            type="text"
                            label="CO2 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.co2_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Input
                            id="co_1"
                            element="input"
                            type="text"
                            label="CO 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.co_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">
                        <Input
                            id="co_2"
                            element="input"
                            type="text"
                            label="CO 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.co_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Input
                            id="coc_1"
                            element="input"
                            type="text"
                            label="COcorr. 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.coc_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">
                        <Input
                            id="coc_2"
                            element="input"
                            type="text"
                            label="COcorr. 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.coc_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Input
                            id="afr_1"
                            element="input"
                            type="text"
                            label="AFR(BNZ) 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.afr_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">
                        <Input
                            id="afr_2"
                            element="input"
                            type="text"
                            label="AFR(BNZ) 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={loadedData.afr_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Input
                            id="tur_rpm_1"
                            element="input"
                            type="text"
                            label="Tur.(RPM) 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={tur_rpm_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">
                        <Input
                            id="tur_rpm_2"
                            element="input"
                            type="text"
                            label="Tur.(RPM) 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={tur_rpm_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Input
                            id="temp_c_1"
                            element="input"
                            type="text"
                            label="Temp C 1"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={temp_c_1}
                            initialValid={true}
                        />
                    </div>
                    <div className="column">
                        <Input
                            id="temp_c_2"
                            element="input"
                            type="text"
                            label="Temp C 2"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a value"
                            onInput={inputHandler}
                            initialValue={temp_c_2}
                            initialValid={true}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={!formState.isValid}>FINALIZEAZA</Button>
            </form>
            }
        </React.Fragment>
    )
}

export default NewGasForm;