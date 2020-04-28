import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Typography,
    Input,
    Button,
    CircularProgress,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@material-ui/core';

import ValidIcon from '@material-ui/icons/CheckCircle';
import InvalidIcon from '@material-ui/icons/Clear';

import LoadResultsTable from "../../LoadResultsTable";

const styles = {
    button: {
        width: 200,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        wordBreak: "break-all"
    },
    buttonArea: {
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
        marginTop:8
    },
    buttonTextArea: {
        display: "flex",
        alignItems: "center",
        marginLeft: 16
    }
}

const LoadStep = ({
    classes,
    onSelectFile,
    filename,
    file,
    onUploadFile,
    schemaName,
    isLoadSuccess,
    elemetsLoaded,
    schemaLoadFailed,
    fileUploadMessage,
    isUploadInProgress,
    isFromStepper = true,
    createdSchema,
    delimiterType,
    setDelimiterType
}) => {

    return (
        <div>
            {isFromStepper && <Typography variant="h6" paragraph>Load data into {schemaName}</Typography>}

            <div className='inputArea' style={{ display: "flex", flexDirection: "column" }}>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Delimter type</FormLabel>
                    <RadioGroup
                        aria-label="delimterType"
                        name="Delimter Type"
                        value={delimiterType}
                        onChange={(e) => setDelimiterType(e.target.value)}
                    >
                        <FormControlLabel value="comma" control={<Radio />} label="Comma" />
                        <FormControlLabel value="space" control={<Radio />} label="Space" />
                        <FormControlLabel value="tab" control={<Radio />} label="Tab" />
                    </RadioGroup>
                </FormControl>

                <div className={classes.buttonArea}>
                    <Button
                        variant="contained"
                        component="label"
                        className={classes.button}
                        disabled={isLoadSuccess}
                    >
                        {filename || "Select CSV file"}
                        <Input
                            type='file'
                            className='custom-file-input'
                            id='customFile'
                            onChange={onSelectFile}
                            label={filename}
                            style={{ display: "none" }}
                            accept=".csv"
                        />
                    </Button>

                    {fileUploadMessage &&
                        <div className={classes.buttonTextArea}>
                            {!fileUploadMessage.startsWith("Invalid") && (
                                <React.Fragment>
                                    <ValidIcon style={{ color: "green", marginRight: 8 }} />
                                    <Typography>{fileUploadMessage}</Typography>
                                </React.Fragment>

                            )}

                            {fileUploadMessage.startsWith("Invalid") && (
                                <React.Fragment>
                                    <InvalidIcon style={{ color: "red", marginRight: 8 }} />
                                    <Typography>{fileUploadMessage}</Typography>
                                </React.Fragment>
                            )}
                        </div>}
                </div>

                <div className={classes.buttonArea}>
                    <Button
                        type='submit'
                        color="primary"
                        variant="contained"
                        onClick={onUploadFile}
                        value='Upload'
                        disabled={!file || !schemaName || isLoadSuccess}
                        className={classes.button}>
                        Upload Data
                    </Button>

                    <div className={classes.buttonTextArea}>

                        {isLoadSuccess && (
                            <React.Fragment>
                                <ValidIcon style={{ color: "green", marginRight: 8 }} />
                                {isFromStepper && <Typography>Success your graph has been created and {elemetsLoaded} edges have been loaded</Typography>}
                                {!isFromStepper && <Typography>Successfully added {elemetsLoaded} edges to {schemaName}</Typography>}
                            </React.Fragment>
                        )}

                        {schemaLoadFailed && (
                            <React.Fragment>
                                <InvalidIcon style={{ color: "red", marginRight: 8 }} />
                                {isFromStepper && <Typography>Schema creation failed</Typography>}
                                {!isFromStepper && <Typography>No edges loaded</Typography>}
                            </React.Fragment>
                        )}

                        {isUploadInProgress && !isLoadSuccess && !schemaLoadFailed && (
                            <span style={{ display: "flex", alignItems: "center" }}>
                                <CircularProgress size={24} style={{ marginRight: 8 }} />
                                <Typography>Creating your graph</Typography>
                            </span>
                        )}

                    </div>
                </div>

                {Object.keys(createdSchema).length > 0 &&
                    <LoadResultsTable
                        createdSchema={createdSchema}
                        isShowingMissingEdges={false}
                    />
                }
            </div>

        </div>
    )
}

LoadStep.propTypes = {
    classes: PropTypes.object.isRequired,
    fileUploadMessage: PropTypes.string,
    onSelectFile: PropTypes.func,
    filename: PropTypes.string,
    file: PropTypes.any,
    onUploadFile: PropTypes.func,
    schemaName: PropTypes.string,
    isLoadSuccess: PropTypes.bool,
    elemetsLoaded: PropTypes.number,
    schemaLoadFailed: PropTypes.bool,
    isUploadInProgress: PropTypes.bool,
    isFromStepper: PropTypes.bool,
    createdSchema: PropTypes.object,
    delimiterType: PropTypes.string,
    setDelimiterType: PropTypes.func
};

export default withStyles(styles)(LoadStep);