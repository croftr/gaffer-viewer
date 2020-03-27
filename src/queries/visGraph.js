import bus1 from "../images/bus1.png";
import bus2 from "../images/bus2.png";
import busCompany from "../images/busCompany.png";

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

export const convertVis = async (data) => {

    const vis = window.vis;
    const nodes = [];
    const edges = [];

    data && data.forEach(edge => {

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

    const network = new vis.Network(container, visData, options);

}