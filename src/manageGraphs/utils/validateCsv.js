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

export const validateCsvFile = (data, fileName) => {

    console.log("validate file ", fileName);
    
    let validationResponse = "No data";
    
    if (data) {
        
        const firstLine = data.substring(0, data.indexOf("\n"));
        
        if (firstLine) {
            const columnCount = firstLine.split(",").length;        
            if (columnCount === SIMPLE_COLUMN_COUNT) {
                validationResponse = "Uploading 2 coulum CSV file";
            } else if (columnCount === DETAIL_COLUMN_COUNT) {
                validationResponse = "Uploading 9 coulum CSV file";
            } else {
                validationResponse =`Invalid file format. Exepecting ${SIMPLE_COLUMN_COUNT} or ${DETAIL_COLUMN_COUNT} columns`;
            }
        }        
    }

    return validationResponse;

}