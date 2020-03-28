import React from 'react';
import { Paper, Button, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import Operations from "./Operations";
import NamedOperations from "./NamedOperations";
import NamedViews from "./NamedViews";

const views = [
    "Operations",
    "Named Operations",
    "Named Views",
]

export default function Queries({ }) {

    const [tabPage, setTabPage] = React.useState(0);

    const handleTabChange = (event, value) => {
        setTabPage(value);
    }

    return (
        <Paper id="operationTabs" style={{ height: "calc(100vh - 90px)", padding: 8 }}>

            <Tabs value={tabPage} onChange={handleTabChange} aria-label="simple tabs example">
                {views.map(view => <Tab label={view} key={view} />)}
            </Tabs>

            {tabPage === 0 && <Operations />}
            {tabPage === 1 && <NamedOperations />}
            {tabPage === 2 && <NamedViews />}

        </Paper>
    );
}