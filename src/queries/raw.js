import { execute } from "../actions/GafferActions"

export const convertRaw = async (edgeType) => {

    const payload = {
        class: "uk.gov.gchq.gaffer.operation.OperationChain",
        operations: [{
            class: "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
        }, {
            class: "uk.gov.gchq.gaffer.operation.impl.Limit",
            resultLimit: 1000,
            truncate: true
        }]
    }

    // const payload = {
    //     "class": "uk.gov.gchq.gaffer.operation.impl.get.GetElements",
    //     "input": [
    //       {
    //         "class": "uk.gov.gchq.gaffer.types.TypeSubTypeValue",
    //         "type": "country",      
    //         "value": "Austria"
    //       },
    //       {
    //         "class": "uk.gov.gchq.gaffer.types.TypeSubTypeValue",
    //         "type": "country",      
    //         "value": "Russia"
    //       },
    //       {
    //         "class": "uk.gov.gchq.gaffer.types.TypeSubTypeValue",
    //         "type": "country",      
    //         "value": "Thailand"
    //       },
    //       {
    //         "class": "uk.gov.gchq.gaffer.types.TypeSubTypeValue",
    //         "type": "country",      
    //         "value": "Norway"
    //       },                    
    //       {
    //         "class": "uk.gov.gchq.gaffer.types.TypeSubTypeValue",
    //         "type": "country",      
    //         "value": "United Kingdom1"
    //       },   
    //     ]
    //   }
    
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