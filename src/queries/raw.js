import { execute } from "../actions/GafferActions"

export const convertRaw = async (edgeType, graph) => {

    console.log("check ", graph);
    

    const payload = {
        class: "uk.gov.gchq.gaffer.operation.OperationChain",
        operations: [
            {
                class: "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
            },
            {
                class: "uk.gov.gchq.gaffer.operation.impl.Limit",
                resultLimit: 10000,
                truncate: true
            }]
    }

    if (graph) {
        payload.operations[0].options =
        {
            "gaffer.federatedstore.operation.graphIds": graph
        }
    }

    if (edgeType) {
        payload.operations[0].view = {
            edges: {
                [edgeType]: {}
            },
            entities: {
                cardinality: {},
                points: {}
            }
        }
    }

    const rawData = await execute(payload);

    return { rawData, payload }

}