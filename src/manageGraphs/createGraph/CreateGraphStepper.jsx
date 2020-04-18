import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { fetchUploadGraph, execute } from "../../actions/GafferActions"

import StepperHeader from "./steps/StepHeader";
import Name from "./steps/Name";
import LoadData from "./steps/LoadData";
import ConfigureGraph from "./steps/Security"
import Confirm from "./steps/Confirm";
import Finished from "./steps/Finished";

import BackIcon from "@material-ui/icons/NavigateBefore"
import NextIcon from "@material-ui/icons/NavigateNext"
import FinishIcon from "@material-ui/icons/Done"

const steps = ['Name it', 'Secure it', 'Upload data', "Review & Confirm"];

export default function CreateGraphStepper({ onCloseDialog }) {

    const [file, setFile] = useState();
    const [createdSchema, setCreatedSchema] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [schemaName, setSchemaName] = useState();
    const [confirmedSchemaName, setConfirmedSchemaName] = useState();
    const [filename, setFilename] = useState('');
    const [nameValidationStatus, setNameValidationStatus] = useState('unknown');
    const [schemaLoadFailed, setSchemaLoadFailed] = useState(false);
    const [auths, setAuths] = useState([]);

    const onChangeSchemaName = (e) => {
        setSchemaName(e.target.value);
    }

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onSelectFile = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        var reader = new FileReader();

        // read csv file as text 
        // reader.onload = (e) => {
        //     console.log("got ", e.target.result);
        // };

        // reader.readAsText(e.target.files[0]);

    };

    const onUploadFile = async e => {

        setSchemaLoadFailed(false);
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', file);

        try {

            const res = await fetchUploadGraph(formData, schemaName);

            if (res) {
                setCreatedSchema(res);
            } else {
                setSchemaLoadFailed(true);
                console.log("no response data ");
            }

        } catch (err) {
            setSchemaLoadFailed(true);
            console.error("error loading file ", err);

        }
    };

    const onValidateSchemaName = async (name) => {

        if (!name || name.length < 1) {
            setNameValidationStatus("invalid");
            return;
        }

        let result = /^[a-zA-Z0-9_]*$/.test(name);

        if (!result) {
            setNameValidationStatus("invalid");
        } else {
            const currentNames = await execute(
                {
                    class: "uk.gov.gchq.gaffer.federatedstore.operation.GetAllGraphIds"
                }
            );

            result = currentNames.includes(name);

            if (result) {
                setNameValidationStatus("invalid");
            } else {
                setNameValidationStatus("valid");
                setConfirmedSchemaName(name)
            }
        }
    }

    const checkNextStepDisabled = () => {

        let disabled = true;

        if (activeStep === 0) {
            if (nameValidationStatus === "valid") {
                disabled = false;
            }
        } else if (activeStep === 1) {
            disabled = false;
        } else if (activeStep === 2) {
            if (createdSchema.loadSuccess) {
                disabled = false;
            }
        } else if (activeStep === 2) {
            disabled = false;
        } else if (activeStep === 3) {
            disabled = false;
        }

        return disabled;
    }

    const onChangeAuths = (e) => {
        setAuths(e.target.value)
    }

    const deleteSchema = () => {
        setSchemaName(undefined);
        setCreatedSchema({});
        setFile(undefined);
        setConfirmedSchemaName(undefined);
        setAuths([])
        setNameValidationStatus("unknown")
        setFilename("")

        handleReset();

        execute(
            {
                class: "uk.gov.gchq.gaffer.federatedstore.operation.RemoveGraph",
                graphId: `${schemaName}`
            }
        );
    }

    return (

        <div style={{ width: "100%", height: "100%", padding: 32 }} >
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div >
                <React.Fragment>
                    <div id="stepperContent" style={{ height: "calc(100vh - 260px)", overflowY: "auto", padding: 32 }}>

                        <StepperHeader activeStep={activeStep} confirmedSchemaName={confirmedSchemaName} />

                        {activeStep === 0 && (
                            <Name
                                schemaName={schemaName}
                                onChangeSchemaName={onChangeSchemaName}
                                nameValidationStatus={nameValidationStatus}
                                onValidateSchemaName={onValidateSchemaName}
                                confirmedSchemaName={confirmedSchemaName}
                            />
                        )}

                        {activeStep === 1 && (
                            <ConfigureGraph
                                schemaName={schemaName}
                                onChangeAuths={onChangeAuths}
                                auths={auths}
                            />
                        )}


                        {activeStep === 2 && (
                            <LoadData
                                onSelectFile={onSelectFile}
                                filename={filename}
                                file={file}
                                onUploadFile={onUploadFile}
                                schemaName={schemaName}
                                isLoadSuccess={createdSchema.loadSuccess}
                                elemetsLoaded={createdSchema.edgeLoadCount}
                                schemaLoadFailed={schemaLoadFailed}
                            />
                        )}

                        {activeStep === 3 && (
                            <Confirm
                                schemaName={schemaName}
                                createdSchema={createdSchema} />
                        )}

                        {activeStep === steps.length && (
                            <Finished
                                handleReset={handleReset}
                                schemaName={schemaName}
                                onCloseDialog={onCloseDialog}
                            />
                        )}

                    </div>

                    {activeStep + 1 <= steps.length &&
                        (
                            <div className="stepperFooter" style={{ marginTop: 16 }}>
                                {activeStep !== steps.length - 1 && (
                                    <Button 
                                        disabled={activeStep === 0} 
                                        onClick={handleBack} 
                                        startIcon={<BackIcon />}
                                        >
                                        Back
                                    </Button>
                                )}

                                {activeStep === 3 && (
                                    <Button
                                        onClick={deleteSchema}
                                        style={{ marginLeft: 16 }}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Cancel Creation of {schemaName}
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    style={{ marginLeft: 16 }}
                                    disabled={checkNextStepDisabled()}
                                    endIcon={activeStep === steps.length - 1 ? <FinishIcon /> : <NextIcon />}
                                >
                                    {activeStep === steps.length - 1 ? `Finish` : 'Next'}
                                </Button>

                            </div>
                        )
                    }

                </React.Fragment>
            </div>
        </div>
    );

}