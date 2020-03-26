import React from 'react';
import { execute } from "./actions/GafferActions"
import { Typography, Button } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';
// import vis from "vis-network";

export default function Data() {

    const [data, setData] = React.useState([]);
    const [isShowGraph, setIsShowGraph] = React.useState(false);

    const standard = async () => {


        setIsShowGraph(false);
        const data = await execute(
            {
                "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
                "limit": 1000
            }
        );
        setData(data);

    }

    React.useEffect(() => {

        standard();

    }, []);

    const keylines = async () => {

        setIsShowGraph(false);
        const data = await execute(
            {
                "class": "uk.gov.gchq.gaffer.operation.OperationChain",
                "operations": [
                    {
                        "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
                    },
                    {
                        "class": "uk.gov.gchq.gaffer.operation.impl.generate.GenerateObjects",
                        "elementGenerator": {
                            "class": "uk.gov.gchq.gaffer.keylines.KeylinesGenerator"
                        }
                    }
                ]
            }
        );
        setData(data);
    }

    const visGraph = async () => {

        setIsShowGraph(true);

        const vis = window.vis;

        const responseData = await execute(
            {
                "class": "uk.gov.gchq.gaffer.operation.OperationChain",
                "operations": [
                    {
                        "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
                    },
                    {
                        "class": "uk.gov.gchq.gaffer.operation.impl.generate.GenerateObjects",
                        "elementGenerator": {
                            "class": "uk.gov.gchq.gaffer.layouts.vis.VisGraphGenerator"
                        }
                    }
                ]
            }
        );

        console.log("got data", responseData);

        const nodes = responseData.filter(element => element.id);
        const edges = responseData.filter(element => element.from);

        // console.log("got nodes", nodes);
        // console.log("got edges", edges);

        var visNodes = new vis.DataSet(nodes);
        var visEdges = new vis.DataSet(edges);

        // create a network
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: visNodes,
            edges: visEdges
        };
        var options = {};
        var network = new vis.Network(container, data, options);

        setData(edges);

    }


    return (
        <Paper>
            <div style={{ display: "flex", alignItems: "center", padding: 8 }}>
                <Typography>Convert to: </Typography>
                <Button style={{ marginLeft: 16 }} variant="contained" onClick={standard}>Default</Button>
                <Button style={{ marginLeft: 16 }} variant="contained" onClick={keylines}>Keylines</Button>
                <Button style={{ marginLeft: 16 }} variant="contained" onClick={visGraph}>Graph</Button>
            </div>


            {!isShowGraph && <div style={{}}>
                {data && <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>}
            </div>
            }

            {isShowGraph && <div id="mynetwork" style={{  width: "100%", height: "calc(100vh - 140px)", border: "1px solid lightgray" }}></div>}

        </Paper>
    );
}