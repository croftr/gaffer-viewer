import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { fetchUploadGraph } from "../actions/GafferActions"

import Step1 from "./steps/ChooseSchemaName";
import Step2 from "./steps/LoadData";
import Step3 from "./steps/ReviewSchema";
import Finished from "./steps/Finished";

const steps = ['Choose your graph name', 'Upload your data', 'Review your schema'];

export default function CreateGraphStepper({ }) {

    const [file, setFile] = useState();
    const [createdSchema, setCreatedSchema] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [schemaName, setSchemaName] = useState();
    const [filename, setFilename] = useState('');

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

        // Closure to capture the file information.
        reader.onload = (e) => {
            console.log("got ", e.target.result);
        };

        reader.readAsText(e.target.files[0]);

    };

    const onUploadFile = async e => {

        e.preventDefault();
        const formData = new FormData();

        formData.append('file', file);

        try {

            const res = await fetchUploadGraph(formData, schemaName);
            console.log("check me ", res);

            if (res) {
                setCreatedSchema(res)
            } else {
                console.log("no response data ");
            }

        } catch (err) {
            console.error("error loading file ", err);

        }
    };

    return (

        <div style={{ width: "100%", height: "100%" }} >
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
                    <div id="stepperContent" style={{ height: "calc(100vh - 260px)", overflowY: "auto", padding: 16 }}>

                        {activeStep === 0 && <Step1 schemaName={schemaName} onChangeSchemaName={onChangeSchemaName} />}
                        {activeStep === 1 && <Step2 onSelectFile={onSelectFile} filename={filename} file={file} onUploadFile={onUploadFile} schemaName={schemaName} />}
                        {activeStep === 2 && <Step3 schemaName={schemaName} createdSchema={createdSchema} />}
                        {activeStep === steps.length && <Finished handleReset={handleReset} />}

                    </div>
                    <div className="stepperFooter" style={{ marginTop: 16 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack} >
                            Back
                                </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            style={{ marginLeft: 16 }}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </React.Fragment>
            </div>
        </div>
    );

}