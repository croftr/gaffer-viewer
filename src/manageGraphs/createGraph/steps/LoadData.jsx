
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography, Input, Button, CircularProgress } from '@material-ui/core';
import ValidIcon from '@material-ui/icons/CheckCircle';
import InvalidIcon from '@material-ui/icons/Clear';

const styles = {
    button: {
        width: 200
    },
    buttonArea: {
        display: "flex", 
        alignItems: "center", 
        marginBottom: 16
    },
    buttonTextArea: {
        display: "flex", 
        alignItems: "center", 
        marginLeft: 16 
    }    
}

const LoadData = ({ classes, onSelectFile, filename, file, onUploadFile, schemaName, isLoadSuccess, elemetsLoaded, schemaLoadFailed, fileUploadMessage, uploadInProgress }) => {

    return (
        <div>
            <Typography variant="h6" paragraph>Load data into {schemaName}</Typography>

            <div className='inputArea' style={{ display: "flex", flexDirection: "column" }}>

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

                        </div>
                    }

                </div>

                <div className={classes.buttonArea}>
                    <Button
                        type='submit'
                        color="primary"
                        variant="contained"
                        onClick={onUploadFile}
                        value='Upload'
                        disabled={!file || !schemaName ||isLoadSuccess}
                        className={classes.button}>
                        Upload Data
                    </Button>

                    <div className={classes.buttonTextArea}>

                        {isLoadSuccess && (
                            <React.Fragment>
                                <ValidIcon style={{ color: "green", marginRight: 8 }} />
                                <Typography>Success your schema has been created and {elemetsLoaded} edges have been loaded</Typography>
                            </React.Fragment>

                        )}

                        {schemaLoadFailed && (
                            <React.Fragment>
                                <InvalidIcon style={{ color: "red", marginRight: 8 }} />
                                <Typography>Schema creation failed</Typography>
                            </React.Fragment>
                        )}

                        {uploadInProgress && !isLoadSuccess && !schemaLoadFailed && (
                            <span style={{ display: "flex", alignItems: "center" }}>
                                <CircularProgress size={24} style={{ marginRight: 8 }} />
                                <Typography>Creating your graph</Typography>
                            </span>
                        )}

                    </div>
                </div>

            </div>

        </div>
    )
}

LoadData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadData);