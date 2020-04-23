import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { fetchUploadGraph, execute } from "../../actions/GafferActions"

import StepperHeader from "./steps/StepHeader";
import Name from "./steps/Name";
import LoadData from "./steps/LoadData";
import Security from "./steps/Security"
import Review from "./steps/Review";
import Finished from "./steps/Finished";

import BackIcon from "@material-ui/icons/NavigateBefore"
import NextIcon from "@material-ui/icons/NavigateNext"
import CloseIcon from "@material-ui/icons/Close"
import { validateCsvFile } from "../utils/validateCsv";

const styles = {
    stepperContent: {
        height: "calc(100vh - 260px)",
        overflowY: "auto",
        padding: 32
    },
    stepperFooter: {
        marginTop: 16,
        padding: 16
    },
    button: {
        width: 100,
        marginRight: 16
    },
    bigButton: {
        width: 200,
        marginRight: 16
    },    
}

const steps = ['Name it', 'Secure it', 'Upload data', "Review & Confirm"];

export const CreateGraphStepper = ({ classes, onCloseDialog, loadSchemas }) => {

    const [file, setFile] = useState();
    const [createdSchema, setCreatedSchema] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [schemaName, setSchemaName] = useState();
    const [confirmedSchemaName, setConfirmedSchemaName] = useState();
    const [filename, setFilename] = useState('');
    const [nameValidationStatus, setNameValidationStatus] = useState('unknown');
    const [schemaLoadFailed, setSchemaLoadFailed] = useState(false);    
    const [fileUploadMessage, setFileUploadMessage] = useState("");
    const [auths, setAuths] = useState([]);
    const [authsRadioValue, setAuthsRadioValue] = useState('justMe');
    const [uploadInProgress, setUploadInProgress] = useState(false);

    const onChangeSchemaName = (e) => {
        setSchemaName(e.target.value);
    }

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (activeStep === 3) {
            loadSchemas();
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            onCloseDialog();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onSelectFile = e => {

        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        var reader = new FileReader();

        // read csv file as text 
        reader.onload = (e) => {
            const validationResponmse = validateCsvFile(e.target.result, e.target.files[0].name);
            setFileUploadMessage(validationResponmse);
        };

        reader.readAsText(e.target.files[0]);

    };

    const onUploadFile = async e => {

        setUploadInProgress(true);

        e.preventDefault();

        setSchemaLoadFailed(false);

        const formData = new FormData();

        formData.append('file', file);

        try {
            let graphAuths;
            if (authsRadioValue === "justMe") {
                graphAuths = "private"
            } else if (authsRadioValue === "everyone") {
                graphAuths = "public"
            } else {
                graphAuths = auths.join(",")
            }
            const res = await fetchUploadGraph(formData, schemaName, graphAuths);

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
        setAuthsRadioValue("justMe")
        setFileUploadMessage("")

        handleReset();

        execute(
            {
                class: "uk.gov.gchq.gaffer.federatedstore.operation.RemoveGraph",
                graphId: `${schemaName}`
            }
        );
    }

    const onResetUpload = () => {

        setCreatedSchema({});
        setFile(undefined);
        setFilename("")
        setNameValidationStatus("unknown")
        setFileUploadMessage("")
        setUploadInProgress(false);

        execute(
            {
                class: "uk.gov.gchq.gaffer.federatedstore.operation.RemoveGraph",
                graphId: `${schemaName}`
            }
        );

    }

    return (

        <div >
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
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
                    <div className={classes.stepperContent}>

                        {activeStep !== steps.length && <StepperHeader activeStep={activeStep} confirmedSchemaName={confirmedSchemaName} />}

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
                            <Security
                                schemaName={schemaName}
                                onChangeAuths={onChangeAuths}
                                auths={auths}
                                authsRadioValue={authsRadioValue}
                                setAuthsRadioValue={setAuthsRadioValue}
                                isStepper={true}
                            />
                        )}

                        {activeStep === 2 && (
                            <LoadData
                                schemaName={schemaName}
                                onSelectFile={onSelectFile}
                                filename={filename}
                                file={file}
                                onUploadFile={onUploadFile}                                
                                isLoadSuccess={createdSchema.loadSuccess}
                                elemetsLoaded={createdSchema.edgeLoadCount}
                                schemaLoadFailed={schemaLoadFailed}
                                fileUploadMessage={fileUploadMessage}
                                onResetUpload={onResetUpload}
                                isUploadInProgress={uploadInProgress}
                            />
                        )}

                        {activeStep === 3 && (
                            <Review
                                schemaName={schemaName}
                                createdSchema={createdSchema}
                                auths={auths}
                                authsRadioValue={authsRadioValue}
                            />
                        )}

                        {activeStep === steps.length && (
                            <Finished
                                handleReset={handleReset}
                                schemaName={schemaName}
                                onCloseDialog={onCloseDialog}
                            />
                        )}

                    </div>

                    {activeStep + 1 <= steps.length && (
                        <div className={classes.stepperFooter}>
                            {activeStep !== steps.length - 1 && (
                                <Button
                                    onClick={handleBack}
                                    className={classes.button}
                                    startIcon={activeStep === 0 ? <CloseIcon /> : <BackIcon />}
                                    color={activeStep === 0 ? "secondary" : "default"}
                                >
                                    {activeStep === 0 ? "Cancel" : "Back"}
                                </Button>

                            )}

                            {activeStep === 3 && (
                                <Button
                                    onClick={deleteSchema}
                                    className={classes.bigButton}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Start again
                                </Button>
                            )}

                            {activeStep === 2 && (
                                <Button
                                    color="secondary"
                                    className={classes.bigButton}
                                    variant="contained"
                                    disabled={!createdSchema.loadSuccess}
                                    onClick={onResetUpload}
                                >
                                    Reset Upload
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={activeStep === steps.length - 1 ? classes.bigButton : classes.button}
                                disabled={checkNextStepDisabled()}
                                endIcon={activeStep === steps.length - 1 ? '' : <NextIcon />}
                            >
                                {activeStep === steps.length - 1 ? `Confirm Create` : 'Next'}
                            </Button>
                        </div>
                    )}

                </React.Fragment>
            </div>
        </div>
    );

}

CreateGraphStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    onCloseDialog: PropTypes.func,
    loadSchemas: PropTypes.func,
};

export default withStyles(styles)(CreateGraphStepper);