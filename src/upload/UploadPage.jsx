
import React, { useLayoutEffect, useState } from 'react';
import { Paper, Button, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import Upload from "./Upload";

export default function Data({ edgeTypes }) {

    return (
        <Paper style={{ height: "100%" }}>
            <Upload />
        </Paper>
    )

}
