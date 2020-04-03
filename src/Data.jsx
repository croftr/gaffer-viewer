import React, { useLayoutEffect, useState } from 'react';
import { Paper, Button, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import { convertRaw } from "./queries/raw.js"
import { convertVis, changeLayout } from "./visGraph/visGraph.js"
import { getEdgeColor } from "./utils/schamUtils"
import VisGraph from "./visGraph/VisGraphViewer.jsx"

import ErrorIcon from '@material-ui/icons/Error';
import SuccessIcon from '@material-ui/icons/CheckCircle';

import { execute } from "./actions/GafferActions"

import { useWindowSize, usePayloadData } from "./customHooks/hooks"

const views = [
    "Raw",
    "Graph",
    "Payload",
]

export default function Data({ edgeTypes }) {

    const [data, setData, graphData, setGraphData] = usePayloadData([])
    const [payload, setPayload] = React.useState({});
    const [tabPage, setTabPage] = React.useState(0);
    const [payloadText, setPayloadText] = React.useState();
    const [responseStatus, setResponseStatus] = React.useState();

    const network = React.useRef();

    const [width, height] = useWindowSize();

    const handleTabChange = (event, value) => {
        value === 1 && visGraph();
        setTabPage(value);
    }

    const getData = async (edgeType) => {
        const { rawData, payload } = await convertRaw(edgeType);
        setData(rawData);
        setPayload(payload);

        const visData = convertVis(rawData);

        if (visData) {
            setGraphData(visData);
        }
    }

    const visGraph = () => {
        setGraphData(convertVis(data));
    }

    const submitPayload = async () => {
        setResponseStatus(undefined);

        try {
            const rawData = await execute(JSON.parse(payloadText));
            setData(rawData);
            setPayload(payloadText);
            convertVis(rawData);
            setResponseStatus({ error: false, message: "Success", count: rawData ? rawData.length : 0 });
        } catch (e) {
            setResponseStatus({ error: true, message: e.message });
        }
    }

    const onChangeText = (e) => {
        setPayloadText(e.target.value);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Paper id="data" style={{ padding: 8 }}>

            <Tabs value={tabPage} onChange={handleTabChange} aria-label="simple tabs example">
                {views.map(view => <Tab label={view} key={view} />)}
            </Tabs>

            <div id="dataFilters" ref={network} style={{ padding: 8 }} >
                {edgeTypes.map(edgeType => (
                    <Button
                        key={edgeType}
                        color="primary"
                        variant="contained"
                        onClick={() => getData(edgeType)} style={{ marginRight: 8, marginBottom: 8, backgroundColor: getEdgeColor(edgeType) }}
                    >
                        {edgeType}
                    </Button>
                ))}
                <Button
                    key="all"
                    color="primary"
                    variant="contained"
                    onClick={() => getData()} style={{ marginRight: 8, marginBottom: 8 }}
                >
                    All
                </Button>
            </div>

            {tabPage === 0 && <JSONPretty style={{ border: "1px solid lightGrey" }} id="json-pretty" data={data} ></JSONPretty>}

            {tabPage === 1 && <VisGraph graphData={graphData} network={network.current} height={height} />}
            <div id="mynetwork" style={{ width: "100%", height: tabPage === 1 ? "calc(100vh - 208px)" : 0, border: tabPage === 1 ? "1px solid lightgray" : "none" }}>
            </div>
            {tabPage === 2 && (
                <div style={{ padding: 16, display: "flex" }}>

                    <div id="submitPayload" style={{ flex: 2, padding: 16 }}>
                        <TextField
                            value={payloadText}
                            onChange={onChangeText}
                            id="standard-textarea"
                            label="Submit payload to /rest/v2/graph/operations/execute"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={20}
                        />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Button onClick={submitPayload} style={{ marginTop: 16, marginRight: 16 }} color="primary" variant="contained">Submit</Button>
                            {responseStatus && responseStatus.error && (
                                <span style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
                                    <ErrorIcon style={{ color: "red", marginRight: 8 }} />
                                    {responseStatus.message}
                                </span>)}
                            {responseStatus && !responseStatus.error && (
                                <span style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
                                    <SuccessIcon style={{ color: "green", marginRight: 8 }} />
                                    {`${responseStatus.message} ${responseStatus.count} rows returned`}
                                </span>
                            )}
                        </div>
                    </div>

                    <div id="displayPayload" style={{ flex: 1, padding: 16, height: "calc(100vh - 250px)" }}>
                        <Typography>Last successfully submitted payload</Typography>
                        <JSONPretty id="json-payload" data={payload}></JSONPretty>
                    </div>

                </div>
            )}

        </Paper>
    );
}