import { execute } from "../actions/GafferActions"

export const convert = async () => {

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

    const nodes = responseData.filter(element => element.id).map(node => {

        const group = node.group.split("|")[0];
        const subType = node.group.split("|")[1];

        let image;

        if (group === "company") {
            image = busCompany;
        } else {
            if (subType === "big_bus") {
                image = bus2;
            } else {
                image = bus1;
            }
        }

        return {
            image,
            ...node
        }
    });

    const edges = responseData.filter(element => element.from);

    var visNodes = new vis.DataSet(nodes);
    var visEdges = new vis.DataSet(edges);

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
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

    var network = new vis.Network(container, data, options);

}