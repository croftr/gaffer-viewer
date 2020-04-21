
import React from 'react';
import { Typography, Input, Button, Tab, Tabs } from '@material-ui/core';
import ValidIcon from '@material-ui/icons/CheckCircle';
import InvalidIcon from '@material-ui/icons/Clear';
import csvLogo from "../../images/csv4.png";

export default function LoadData({ onSelectFile, filename, file, onUploadFile, schemaName, isLoadSuccess, elemetsLoaded, schemaLoadFailed, fileUploadMessage }) {

    return (
        <div>
            <Typography variant="h6" paragraph>Load data into {schemaName}</Typography>

            {/* <img src={csvLogo} /> */}

            <div className='inputArea' style={{ display: "flex", flexDirection: "column" }}>

                <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <Button
                        variant="contained"
                        component="label"
                        style={{ width: 200 }}
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
                        <div className="loadFileResults" style={{ display: "flex", alignItems: "center", marginLeft: 16 }}>

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

                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        type='submit'
                        color="primary"
                        variant="contained"
                        onClick={onUploadFile}
                        value='Upload'
                        disabled={!file || !schemaName}
                        style={{ width: 200 }}
                        className='btn btn-primary btn-block mt-4'>
                        Upload Data
                    </Button>

                    <div className="validationResults" style={{ display: "flex", alignItems: "center", marginLeft: 16 }}>

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

                    </div>


                </div>

            </div>

        </div>
    )

}
