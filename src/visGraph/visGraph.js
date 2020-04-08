import { CircularProgress } from "@material-ui/core";

import React from 'react';
import bus1 from "../images/bus1.png";
import bus2 from "../images/bus2.png";
import busCompany from "../images/busCompany.png";
import kangaroo from "../images/kanga.png";
import customer from "../images/customer.png";
import productId from "../images/productId.png";
import email from "../images/email.png";
import productName from "../images/productName.png";
import book from "../images/book.png";
import hen from "../images/hen.png";
import dolphin from "../images/dolphin.png";

import { getEdgeColor } from "../utils/schamUtils";

const vis = window.vis;
let network;

const layouts = [
    {
        improvedLayout: true,
        clusterThreshold: 150
    },
    {
        hierarchical: {
            enabled: true,
            shakeTowards: 'roots'  // roots, leaves
        }
    }
]

const changeChosenNodeColor = function (values, id, selected, hovering) {
    values.shadow = true;
};

export const changeLayout = (visData) => {
    var options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        locale: 'en',
        clickToUse: false,
        interaction: {
            navigationButtons: false,
        },
        layout: {
            improvedLayout: true,
            clusterThreshold: 150
        },
        interaction: {
            hover: true,
            multiselect: true,
            hideEdgesOnDrag: false,
            hideEdgesOnZoom: false
        }
    }

    options.layout = layouts[0];

    network.destroy();
    network = null;

    createGraph(visData, options)
}

const visId = (node) => {

    if (node.subType) {
        return `${node.type} ${node.subType} ${node.value}`
    } else {
        return `${node.type} ${node.value}`
    }

}

const mapVisNode = (node) => {

    let image, shape = "image";

    switch (node.subType ? node.subType.toLowerCase() : "") {
        case "dolphin":
            image = dolphin;
            break;
        case "kangaroo":
            image = kangaroo;
            break;
        case "hen":
            image = hen;
        case "big_bus":
            image = bus2;
            break;
        case "small_bus":
            image = bus1;
            break;
        case "book":
            image = book;
            break;
        default: {
            switch (node.type.toLowerCase()) {
                case "company": {
                    image = busCompany;
                    break;
                }
                case "bus": {
                    image = bus1;
                    break;
                }
                case "customerid": {
                    image = customer;
                    break;
                }
                case "email": {
                    image = email;
                    break;
                }
                case "productname": {
                    image = productName;
                    break;
                }
                case "productid": {
                    image = productId;
                    break;
                }
                default: shape = "dot";
            }
        }
    }

    const visNode = {
        group: node.type,
        subType: node.subType,
        id: visId(node),
        label: node.value,
        title: node.subType ? node.type + " " + node.subType : node.type,
        shape,
        image,
        physics: false,
        size: 10,
        chosen: {
            node: changeChosenNodeColor
        },
    }

    visNode.image = image;
    return visNode;

}

const mapVisEdge = (edge) => {

    const source = edge.source["uk.gov.gchq.gaffer.types.TypeSubTypeValue"];
    const dest = edge.destination["uk.gov.gchq.gaffer.types.TypeSubTypeValue"];

    const color = getEdgeColor(edge.group);

    const visEdge = {
        from: visId(source),
        to: visId(dest),
        title: edge.group,
        color,
        arrows: {
            to: {
                enabled: edge.directed ? true : false,
                scaleFactor: 0.2,
            },
        },
        value: edge.properties.count,
        scaling: {
            min: 1,
            max: 3,
            label: true
        },
        smooth: {
            type: "continuous"
        },
        physics: true,
    };

    return visEdge;
}

const createGraph = (visData, options) => {

    var container = document.getElementById("mynetwork");
    network = new vis.Network(container, visData, options);

    // add event listeners
    network.on("select", function (params) {

        console.log("selected ", params.nodes);


        const selectedNodeIds = params.nodes;

        const nodeDetails = selectedNodeIds ? `${selectedNodeIds.join(" AND ")}` : "";
        document.getElementById("graphInfo").innerHTML = nodeDetails;
    });

    network.on("stabilizationProgress", function (params) {
        const loadingBar = document.getElementById("loadingBar");
        if (loadingBar) {
            loadingBar.style.display = "block"
        }
    });

    network.once("stabilizationIterationsDone", function () {
        const loadingBar = document.getElementById("loadingBar");
        if (loadingBar) {
            loadingBar.style.display = "none";
        }
    });
}

export const convertVis = (data) => {

    const graphNodes = []
    const graphEdges = []

    if (data && Array.isArray(data)) {

        data.filter(d => d.class === "uk.gov.gchq.gaffer.data.element.Edge").forEach(edge => {

            const sourceNode = mapVisNode(edge.source["uk.gov.gchq.gaffer.types.TypeSubTypeValue"]);
            const destNode = mapVisNode(edge.destination["uk.gov.gchq.gaffer.types.TypeSubTypeValue"]);

            const visEdge = mapVisEdge(edge);

            if (!graphNodes.find(i => i.id === sourceNode.id)) {
                graphNodes.push(sourceNode);
            }

            if (!graphNodes.find(i => i.id === destNode.id)) {
                graphNodes.push(destNode);
            }

            graphEdges.push(visEdge)

        });

        data.filter(d => d.class === "uk.gov.gchq.gaffer.data.element.Entity").forEach(entity => {
                                    
            const cardinalityGroup = entity.properties?.approxCardinality
            let cardinality;

            if (cardinalityGroup) {
                cardinality = cardinalityGroup["com.clearspring.analytics.stream.cardinality.HyperLogLogPlus"]?.hyperLogLogPlus?.cardinality;
            }

            const totalPoints = entity.properties?.totalPoints || 0;
            const juryPoints = entity.properties?.juryPoints;
            const telePoints = entity.properties?.telePoints;

            //cardinality Degrees
            if (cardinality) {

                const vertex = entity.vertex["uk.gov.gchq.gaffer.types.TypeSubTypeValue"];

                const id = visId(vertex);
                const nodeToEnrich = graphNodes.find(node => node.id === id);

                if (nodeToEnrich) {
                    nodeToEnrich.value = cardinality;
                    nodeToEnrich.title = `Cardinality ${cardinality}`
                }
            }

            //total points degrees
            // if (totalPoints) {

            //     const vertex = entity.vertex["uk.gov.gchq.gaffer.types.TypeSubTypeValue"];

            //     const id = visId(vertex);
            //     const nodeToEnrich = graphNodes.find(node => node.id === id);

                
            //     if (nodeToEnrich) {
            //         nodeToEnrich.value = totalPoints;
            //         nodeToEnrich.title = `Total Points ${totalPoints}`

            //         nodeToEnrich.properties = {
            //             totalPoints,
            //             juryPoints,
            //             telePoints
            //         }
                    
            //     }
               
            // }
        
        });
}

var visNodes = new vis.DataSet(graphNodes);
var visEdges = new vis.DataSet(graphEdges);

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
        navigationButtons: false,
    },
    layout: {
        improvedLayout: true,
        clusterThreshold: 150
    },
    interaction: {
        hover: true,
        multiselect: true,
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false
    }
}
createGraph(visData, options);

return visData;

}