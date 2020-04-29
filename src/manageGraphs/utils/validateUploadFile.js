const SIMPLE_COLUMN_COUNT = 2;
const DETAIL_COLUMN_COUNT = 9;

export const SIMPLE_COLUMNS = {
    "From Value": {
        type: "string",
        mandatory: "true",
        description: "The value of the from node"
    },
    "To Value": {
        type: "string",
        mandatory: "true",
        description: "The value of the to node"
    }
}

export const DETAILED_COLUMNS = {
    "From Type": {
        type: "string",
        mandatory: "false",
        description: "The category type of the from node"
    },
    "From SubType": {
        type: "string",
        mandatory: "false",
        description: "The category sub type of the from node"
    },
    "From Value": {
        type: "string",
        mandatory: "true",
        description: "The value of the from node"
    },
    "Edge Type": {
        type: "string",
        mandatory: "false",
        description: "The name of the edge that links these 2 nodes"
    },
    "Directed": {
        type: "boolean",
        mandatory: "false",
        description: "If true the edge will be directed towards the to node"
    },
    "Edge Weight": {
        type: "number",
        mandatory: "false",
        description: "How many occurances of the edge interaction are there"
    },
    "To Type": {
        type: "string",
        mandatory: "false",
        description: "The category type of the to node"
    },
    "To SubType": {
        type: "string",
        mandatory: "false",
        description: "The category sub type of the to node"
    },
    "To Value": {
        type: "string",
        mandatory: "true",
        description: "The value of the to node"
    },
}

export const lookupDelimiter = (delimterDescription) => {

    switch (delimterDescription) {
        case "space" : 
            return " ";
        case "tab" :
            return "\t";
        default:
            return ","
    }
}

export const validateFile = (data, fileName, delimiterType) => {

    console.log("validate file ", fileName);

    let delimter = lookupDelimiter(delimiterType);

    let validationResponse = { message: "No data", columnCount: 0 };
    
    if (data) {
        
        const firstLine = data.substring(0, data.indexOf("\n"));
        
        if (firstLine) {
            const columnCount = firstLine.split(delimter).length;        
            
            if (columnCount === SIMPLE_COLUMN_COUNT || columnCount === DETAIL_COLUMN_COUNT) {
                validationResponse.message = `Uploading ${columnCount} coulum ${delimiterType} delimited file`;    
                validationResponse.columnCount = columnCount;
            } else {
                validationResponse.message =`Invalid file format. Exepecting ${SIMPLE_COLUMN_COUNT} or ${DETAIL_COLUMN_COUNT} columns`;
            }
        }        
    }

    return validationResponse;

}