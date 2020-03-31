import bus1 from "../images/bus1.png";
import bus2 from "../images/bus2.png";
import busCompany from "../images/busCompany.png";
import kangaroo from "../images/kanga.png";
import customer from "../images/customer.png";
import productId from "../images/productId.png";
import email from "../images/email.png";
import productName from "../images/productName.png";
import book from "../images/book.png";

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

    let options = network.options;
    options.layout = layouts[0];

    network.destroy();
    network = null;

    createGraph(visData, options)

}

const visId = (node) => {
    return `${node.type} ${node.subType} ${node.value}`
}

const mapVisNode = (node) => {

    let image, shape = "image";

    switch (node.subType.toLowerCase()) {
        case "big_bus" : 
            image = bus2;
            break;
        case "small_bus" : 
            image = bus1;
            break;            
        case "book" : 
            image = book;
            break;            
        default: {
            switch (node.type.toLowerCase()) {
                case "company" : {
                    image = busCompany;
                    break;
                }
                case "bus" : {
                    image = bus1;
                    break;
                }
                case "kangaroo" : {
                    image = kangaroo;
                    break;
                }
                case "customerid" : {
                    image = customer;
                    break;
                }
                case "email" : {
                    image = email;
                    break;
                }
                case "productname" : {
                    image = productName;
                    break;
                }
                case "productid" : {
                    image = productId;
                    break;
                }
                default: shape = "ellipse";
            }
        }
    }

    const visNode = {
        group: node.type,
        subType: node.subType,
        id: visId(node),
        label: node.value,
        title: node.type + " " + node.subType,
        shape,
        image,
        size: 25,
        physics: false,
        chosen: {
            node: changeChosenNodeColor
        }
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
        arrows: edge.directed ? "to" : undefined,
        value: edge.properties.count,
        scaling: {
            max: 10,
        }
    };

    return visEdge;
}

const createGraph = (visData, options) => {

    var container = document.getElementById("mynetwork");
    network = new vis.Network(container, visData, options);

    // add event listeners
    network.on("select", function (params) {
        const selectedNode = params.nodes[0];
        document.getElementById("graphInfo").innerHTML = selectedNode || ""
    });
}

export const convertVis = (data) => {

    const nodes = [];
    const edges = [];

    if (data && Array.isArray(data)) {
        data.filter(d => d.class === "uk.gov.gchq.gaffer.data.element.Edge").forEach(edge => {

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
    }


    var visNodes = new vis.DataSet(nodes);
    var visEdges = new vis.DataSet(edges);

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
        }
    }

    createGraph(visData, options)

    return visData;

}