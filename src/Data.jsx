import React from 'react';
import { execute } from "./actions/GafferActions"
import { Typography, Button } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';
import bus1 from "./images/bus1.png";
import bus2 from "./images/bus2.png";
import bus3 from "./images/bus3.png";
import busCompany from "./images/busCompany.png";



export default function Data() {

    const [data, setData] = React.useState([]);
    const [graph, setGraph] = React.useState([]);
    const [isShowGraph, setIsShowGraph] = React.useState(false);

    const standard = async () => {

        setIsShowGraph(false);
        const data = await execute(
            {
                "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
                "limit": 1000
            }
        );

        console.log("data 1 ", data);


        setData(data);

        console.log("data 2 ", data);

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

    // const visGraph = async () => {

    //     setIsShowGraph(true);

    //     const vis = window.vis;

    //     const responseData = await execute(
    //         {
    //             "class": "uk.gov.gchq.gaffer.operation.OperationChain",
    //             "operations": [
    //                 {
    //                     "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
    //                 },
    //                 {
    //                     "class": "uk.gov.gchq.gaffer.operation.impl.generate.GenerateObjects",
    //                     "elementGenerator": {
    //                         "class": "uk.gov.gchq.gaffer.layouts.vis.VisGraphGenerator"
    //                     }
    //                 }
    //             ]
    //         }
    //     );


    //     const nodes = responseData.filter(element => element.id).map(node => {

    //         const group = node.group.split("|")[0];
    //         const subType = node.group.split("|")[1];

    //         let image;

    //         if (group === "company") {
    //             image = busCompany;
    //         } else {
    //             if (subType === "big_bus") {
    //                 image = bus2;
    //             } else {
    //                 image = bus1;
    //             }
    //         }

    //         return {
    //             image,
    //             ...node
    //         }
    //     });

    //     const edges = responseData.filter(element => element.from);

    //     console.log("got nodes", nodes);
    //     // console.log("got edges", edges);

    //     var visNodes = new vis.DataSet(nodes);
    //     var visEdges = new vis.DataSet(edges);

    //     // create a network
    //     var container = document.getElementById("mynetwork");
    //     var data = {
    //         nodes: visNodes,
    //         edges: visEdges
    //     };

    //     var options = {
    //         autoResize: true,
    //         height: '100%',
    //         width: '100%',
    //         locale: 'en',
    //         clickToUse: false,
    //         interaction: {
    //             navigationButtons: true,
    //         }

    //     }

    //     var network = new vis.Network(container, data, options);

    //     // setData(edges);

    // }

    const mapVisNode = (node) => {

        let image, shape;

        if (node.type === "company") {
            image = busCompany;
            shape = "image";
        } else if (node.subType === "big_bus") {
            image = bus2;
            shape = "image";
        } else if (node.subType === "small_bus") {
            image = bus1;
            shape = "image";
        } else if (node.type === "bus") {
            image = bus1;
            shape = "image";                
        } else {
            shape = "ellipse";
        }

        const visNode = {
            group: node.type,
            subType: node.subType,
            id: node.type + node.subType + node.value,
            label: node.value,
            group: node.type,
            title: node.subType,
            shape,
            image,
            physics: false,
        }

        visNode.image = image;

        return visNode;

    }

    const mapVisEdge = (edge) => {

        const source = edge.source["uk.gov.gchq.gaffer.types.TypeSubTypeValue"];
        const dest = edge.destination["uk.gov.gchq.gaffer.types.TypeSubTypeValue"];

        let color = "grey";

        switch (edge.group) {
            case "crossesPaths":
                color = "red";
                break;
            case "isPartOfThisCompany":
                color = "purple";
                break;
            case "inTheSameBusCompany":
                color = "lightBlue";
                break;
        }

        const visEdge = {
            from: source.type + source.subType + source.value,
            to: dest.type + dest.subType + dest.value,
            title: edge.group,
            color,
            arrows: edge.directed ? "to" : undefined
        };

        return visEdge;
    }

    const visGraphUi = () => {

        setIsShowGraph(true);

        const vis = window.vis;
        const nodes = [];
        const edges = [];

        data.forEach(edge => {

            console.log("edge ", edge);

            const sourceNode = mapVisNode(edge.source["uk.gov.gchq.gaffer.types.TypeSubTypeValue"]);
            const destNode = mapVisNode(edge.destination["uk.gov.gchq.gaffer.types.TypeSubTypeValue"]);
            const visEdge = mapVisEdge(edge);

            if (!nodes.find(i => i.id === sourceNode.id)) {
                nodes.push(sourceNode);
            }

            if (!nodes.find(i => i.id === destNode.id)) {
                nodes.push(destNode);
            }

            edges.push(visEdge)

        });

        console.log("got nodes", nodes);
        console.log("got edges", edges);


        var visNodes = new vis.DataSet(nodes);
        var visEdges = new vis.DataSet(edges);

        // create a network
        var container = document.getElementById("mynetwork");

        var visData = {
            nodes: visNodes,
            edges: visEdges
        };

        var options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            locale: 'en',
            clickToUse: false,
            interaction: {
                navigationButtons: true,
            }
        }

        var network = new vis.Network(container, visData, options);

    }


    return (
        <Paper>
            <div style={{ display: "flex", alignItems: "center", padding: 8 }}>
                <Button style={{ marginLeft: 16, width: 200 }} variant="contained" onClick={standard}>Raw</Button>
                {/* <Button style={{ marginLeft: 16, width: 200 }} variant="contained" onClick={visGraph}>Graph</Button> */}
                <Button style={{ marginLeft: 16, width: 200 }} variant="contained" onClick={visGraphUi}>Graph</Button>
            </div>


            <div style={{}}>
                {!isShowGraph && data && <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>}
                <div id="mynetwork" style={{ width: "100%", height: !isShowGraph ? 0 : "calc(100vh - 140px)", border: "1px solid lightgray" }}></div>
            </div>


        </Paper>
    );
}