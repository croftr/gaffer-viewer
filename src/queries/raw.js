import { execute } from "../actions/GafferActions"

export const convertRaw = async (edgeType) => {

    const payload = {
        class: "uk.gov.gchq.gaffer.operation.OperationChain",
        operations: [{
            class: "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
        }, {
            class: "uk.gov.gchq.gaffer.operation.impl.Limit",
            resultLimit: 500,
            truncate: true
        }]
    }
    
    if (edgeType) {
        payload.view = {
            edges: {
                [edgeType]: {}
            }
        }
    }

    const rawData = await execute(payload);

    return { rawData, payload }

}