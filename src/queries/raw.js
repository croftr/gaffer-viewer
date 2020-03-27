import { execute } from "../actions/GafferActions"

export const convertRaw = async (edgeType) => {
        
    const payload =     {
        "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
        "limit": 1000
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