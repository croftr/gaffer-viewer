
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography, Input, Button, Tab, Tabs } from '@material-ui/core';
import ValidIcon from '@material-ui/icons/Done';
import InvalidIcon from '@material-ui/icons/Clear';
import simpleCsv from "../images/simpleCsv.jpg";
import detailCsv from "../images/detailCsv.jpg";

const csvFormats = ["Detaied", "Simple"]

export default function LoadData({ onSelectFile, filename, file, onUploadFile, schemaName, isLoadSuccess, elemetsLoaded, schemaLoadFailed }) {

    const [tabPage, setTabPage] = React.useState(0);

    return (
        <div>
            <Typography>You can now create and laod data into {schemaName} from a CSV file of the required format</Typography>

            <Tabs style={{ marginTop: 16 }} value={tabPage} onChange={(event, value) => setTabPage(value)} aria-label="simple tabs example">
                {csvFormats.map(view => <Tab label={view} key={view} />)}
            </Tabs>

            {tabPage === 0 && (
                <div id="detailCsvPage" style={{ height: 400, padding: 32, display: "flex" }}>
                    <img src={detailCsv} width="800" />
                    <div className="csvHelpText" style={{ marginLeft: 32 }}>
                        <Typography paragraph="true">
                            Use the detailed upload format if you want to be able to control node and edge types as well as having the option of specifying edge weights
                        </Typography>
                    </div>
                </div>
            )}

            {tabPage === 1 && (
                <div id="simpleCsvPage" style={{ height: 400, padding: 32, display: "flex" }}>
                    <img src={simpleCsv} width="300" />
                    <div className="csvHelpText" style={{ marginLeft: 32 }}>
                        <Typography paragraph="true">
                            You can use the simple upload format to just specify from and to node values.
                        </Typography>
                        <Typography paragraph="true">
                            Edge types will be set to the generic type of "interaction"
                        </Typography>
                        <Typography paragraph="true">
                            This can be useful for quickly creating graphs and visualizing data for which you dont have much information about.
                        </Typography>
                    </div>
                </div>
            )}

            <div className='inputArea' style={{ display: "flex" }}>

                <Button
                    variant="contained"
                    component="label"
                    style={{ width: 200, marginRight: 16 }}
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

                <Button
                    type='submit'
                    color="secondary"
                    variant="contained"
                    onClick={onUploadFile}
                    value='Upload'
                    disabled={!file || !schemaName}
                    style={{ width: 200 }}
                    className='btn btn-primary btn-block mt-4'>
                    Upload Data
                </Button>

                <div className="validationResults" style={{ display: "flex", alignItems: "center", marginTop: 16, marginLeft: 16 }}>

                    {isLoadSuccess && (
                        <React.Fragment>
                            <ValidIcon style={{ color: "green", marginRight: 8 }} />
                            <Typography>Success your schema has been created and {elemetsLoaded} elemets have been loaded</Typography>                            
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
    )

}
