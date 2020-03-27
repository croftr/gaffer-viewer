import React from 'react';
import { Typography, Button } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { convertRaw } from "./queries/raw.js"
import { convertVis } from "./queries/visGraph.js"
import { getEdgeColor } from "./utils/schamUtils"

const views = [
    "Raw",
    "Graph",
    "Payload"
]

export default function Data({ edgeTypes }) {

    const [data, setData] = React.useState([]);
    const [payload, setPayload] = React.useState({});    
    const [tabPage, setTabPage] = React.useState(0);

    const handleTabChange = (event, value) => {
        value === 1 && visGraph();
        setTabPage(value);
    }

    const getData = async (edgeType) => {
        const { rawData, payload } = await convertRaw(edgeType);
        setData(rawData);
        setPayload(payload);
        convertVis(rawData);
    }

    const visGraph = () => {
        convertVis(data);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Paper style={{ padding: 8 }}>

            <Tabs value={tabPage} onChange={handleTabChange} aria-label="simple tabs example">
                {views.map(view => <Tab label={view} />)}
            </Tabs>

            <div id="dataFilters" style={{ padding: 8 }} >
                {edgeTypes.map(edgeType => (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => getData(edgeType)} style={{ marginRight: 8, backgroundColor: getEdgeColor(edgeType) }}
                    >
                        {edgeType}
                    </Button>
                ))}
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => getData()} style={{ marginRight: 8 }}
                >
                    All
                    </Button>
            </div>


            <div style={{}}>
                {tabPage === 0 && <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>}
                <div id="mynetwork" style={{ width: "100%", height: tabPage === 1 ? "calc(100vh - 200px)" : 0, border: "1px solid lightgray" }}></div> 
                {tabPage === 2 && <JSONPretty id="json-pretty" data={payload}></JSONPretty>}
                
            </div>
        </Paper>
    );
}