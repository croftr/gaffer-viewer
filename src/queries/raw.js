import { execute } from "../actions/GafferActions"

export const convertRaw = async (edgeType) => {

    console.log("convertRaw ", edgeType);
    

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

    console.log(payload);    
    return await execute(payload);
}