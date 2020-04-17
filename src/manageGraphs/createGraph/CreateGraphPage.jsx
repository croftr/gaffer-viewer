
import React, { useLayoutEffect, useState } from 'react';
import { Paper, Button, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import CreateGraph from "./steps/CreateGraph";
import CreateGraphStepper from "./CreateGraphStepper";

export default function Data({ edgeTypes, onCloseDialog }) {

    const [isStarted, setisStarted] = useState(false);

    return (
        <Paper style={{}}>


            {!isStarted && (
                <div>
                    <Typography>This stepper will walk you through the create graph stage press ok to get started</Typography>
                    <Button onClick={() => setisStarted(true)}>OK LETS GET STARTED</Button>
                    <Button onClick={onCloseDialog}>BACK TO MANAGE GRAPHS</Button>
                </div>
            )}

            {isStarted && <CreateGraphStepper onCloseDialog={onCloseDialog} />}

        </Paper>
    )

}
