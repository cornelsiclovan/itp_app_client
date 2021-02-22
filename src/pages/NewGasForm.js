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

    const dataSubmitHandler = async event => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5001/api/gas/${filename}`, 
            'PATCH', 
            JSON.stringify({
                lambda: formState.inputs.lambda.value,
                hc: formState.inputs.hc.value,
                o2: formState.inputs.o2.value,
                co2: formState.inputs.co2.value,
                co: formState.inputs.co.value,
                coc: formState.inputs.coc.value,
                afr: formState.inputs.afr.value,
                tur_rpm: tur_rpm_1,
                temp_c: temp_c_1
            }), {'Content-Type': 'application/json'}
            );

            
        } catch(err) {}
    }

    const [formState, inputHandler, setFormData] = useForm({
        lambda: {
            value: '',
            isValid: true
        },
        hc: {
            value: '',
            isValid: true
        },
        o2: {
            value: '',
            isValid: true
        },
        co2: {
            value: '',
            isValid: true
        },
        co: {
            value: '',
            isValid: true
        },
        coc: {
            value: '',
            isValid: true
        },
        afr: {
            value: '',
            isValid: true
        },
        tur_rpm: {
            value: '',
            isValid: true
        },
        temp_c: {
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
                    lambda: {
                        value: responseData.lambda_1,
                        isValid: true
                    },
                    hc: {
                        value: responseData.hc_1,
                        isValid: true
                    },
                    o2: {
                        value: responseData.o2_1,
                        isValid: true
                    },
                    co2: {
                        value: responseData.co2_1,
                        isValid: true
                    },
                    co: {
                        value: responseData.co_1,
                        isValid: true
                    },
                    coc: {
                        value: responseData.coc_1,
                        isValid: true
                    },
                    afr: {
                        value: responseData.afr_1,
                        isValid: true
                    },
                    tur_rpm: {
                        value: tur_rpm_1,
                        isValid: true
                    },
                    temp_c: {
                        value: temp_c_1,
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

    //console.log("loadedDAta", loadedData);
    return (
        <React.Fragment>
            { !isLoading && loadedData && 
            <form className="gas-form" onSubmit={dataSubmitHandler}>
                <Input
                    id="lambda"
                    element="input"
                    type="text"
                    label="Lambda"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={loadedData.lambda_1}
                    initialValid={true}
                />
                <Input
                    id="hc"
                    element="input"
                    type="text"
                    label="Hc"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={loadedData.hc_1}
                    initialValid={true}
                />
                <Input
                    id="o2"
                    element="input"
                    type="text"
                    label="O2"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={loadedData.co2_1}
                    initialValid={true}
                />
                <Input
                    id="co2"
                    element="input"
                    type="text"
                    label="CO2"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={loadedData.co2_1}
                    initialValid={true}
                />
                <Input
                    id="co"
                    element="input"
                    type="text"
                    label="CO"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={loadedData.co_1}
                    initialValid={true}
                />
                <Input
                    id="coc"
                    element="input"
                    type="text"
                    label="COcorr."
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={loadedData.coc_1}
                    initialValid={true}
                />
                <Input
                    id="afr"
                    element="input"
                    type="text"
                    label="AFR(BNZ)"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={loadedData.afr_1}
                    initialValid={true}
                />
                 <Input
                    id="tur_rpm"
                    element="input"
                    type="text"
                    label="Tur.(RPM)"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={tur_rpm_1}
                    initialValid={true}
                />
                 <Input
                    id="temp_c"
                    element="input"
                    type="text"
                    label="Temp C"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="please enter a value"
                    onInput={inputHandler}
                    initialValue={temp_c_1}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>FINALIZEAZA</Button>
            </form>
            }
        </React.Fragment>
    )
}

export default NewGasForm;