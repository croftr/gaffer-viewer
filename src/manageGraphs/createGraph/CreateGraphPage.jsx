
import React, { useLayoutEffect, useState } from 'react';
import { Paper, Button, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import CreateGraph from "./steps/CreateGraph";
import CreateGraphStepper from "./CreateGraphStepper";

export default function Data({ edgeTypes }) {

    return (
        <Paper style={{ height: "100%", padding: 16 }}>
            <CreateGraphStepper />
        </Paper>
    )

}
