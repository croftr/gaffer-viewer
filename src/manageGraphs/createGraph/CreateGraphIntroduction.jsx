
import React, { useLayoutEffect, useState } from 'react';
import { Paper, Button, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import CreateGraphStepper from "./CreateGraphStepper";
import simpleCsv from "../images/simpleCsv.jpg";
import detailCsv from "../images/detailCsv.jpg";

const csvFormats = ["Detaied", "Simple"]
const csvDescriptions = [
    "Use the detailed upload format if you want to be able to control node and edge types as well as having the option of specifying edge weights",
    "You can use the simple upload format to just specify from and to node values. Edge types will be set to the generic type of INTERACTION"
]

export default function CreateGraphIntroduction({ onCloseDialog, loadSchemas }) {

    const [isStarted, setisStarted] = useState(false);
    const [tabPage, setTabPage] = useState(0);
    const [csvFormatText, setCsvFormatText] = useState(csvDescriptions[0]);

    const changeTabPage = (value) => {
        setTabPage(value);
        setCsvFormatText(csvDescriptions[value]);
    }

    return (
        <div>

            {!isStarted && (
                <div className="intoductionContent" style={{ padding: 32 }}>

                    <Typography>You can use this to create a graph and load data into it from uploading a CSV file</Typography>
                    <Typography paragraph>This stepper will walk you through the create graph stage</Typography>

                    <Typography paragraph>You can upload data from CSV files in different formats.  Click on the tabs below to see the accepted formats. </Typography>

                    <Typography variant="h6" paragraph>{csvFormatText}</Typography>

                    <Tabs style={{ marginTop: 16 }} value={tabPage} onChange={(event, value) => changeTabPage(value)} aria-label="simple tabs example">
                        {csvFormats.map(view => <Tab label={view} key={view} />)}
                    </Tabs>

                    {tabPage === 0 && (
                        <div className="imageWrapper" style={{ height: 300, paddingTop: 16 }}>
                            <img src={detailCsv} width="800" />
                        </div>

                    )}

                    {tabPage === 1 && (
                        <div className="imageWrapper" style={{ height: 300, paddingTop: 16 }}>
                            <img src={simpleCsv} width="300" />
                        </div>
                    )}

                    <div className="buttons" style={{ marginTop: 32 }}>
                        <Button variant="contained" color="primary" onClick={() => setisStarted(true)}>OK LETS GET STARTED</Button>
                        <Button variant="contained" color="secondary" style={{ marginLeft: 16 }} onClick={onCloseDialog}>BACK TO MANAGE GRAPHS</Button>
                    </div>

                </div>
            )}

            {isStarted && <CreateGraphStepper onCloseDialog={onCloseDialog} loadSchemas={loadSchemas}/>}

        </div>
    )

}
