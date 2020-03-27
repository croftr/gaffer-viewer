import React from 'react';
import { Typography, Button } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';

import { convertRaw } from "./queries/raw.js"
import { convertVis } from "./queries/visGraph.js"
import { getEdgeColor } from "./utils/schamUtils"

export default function Data({ edgeTypes }) {

    const [data, setData] = React.useState([]);
    const [isShowGraph, setIsShowGraph] = React.useState(false);

    const getData = async (edgeType) => {
        const rawData = await convertRaw(edgeType);
        setData(rawData);
        convertVis(rawData);
    }

    const visGraph = () => {
        convertVis(data);
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Paper>
            <div style={{ display: "flex", alignItems: "center", padding: 8, justifyContent: "space-between" }}>
                <div id="dataViews">
                    <Button style={{ marginLeft: 0, width: 100 }} variant="contained" onClick={() => { setIsShowGraph(false) }}>Raw</Button>
                    <Button style={{ marginLeft: 16, width: 100 }} variant="contained" onClick={() => { setIsShowGraph(true); visGraph() }}>Graph</Button>
                </div>

                <div id="dataFilters" style={{}} >
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
            </div>

            <div style={{}}>
                {!isShowGraph && data && <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>}
                <div id="mynetwork" style={{ width: "100%", height: !isShowGraph ? 0 : "calc(100vh - 140px)", border: "1px solid lightgray" }}></div>
            </div>
        </Paper>
    );
}