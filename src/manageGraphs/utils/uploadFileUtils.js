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

const SIMPLE_COLUMN_COUNT = Object.keys(SIMPLE_COLUMNS).length;
const DETAIL_COLUMN_COUNT = Object.keys(DETAILED_COLUMNS).length;

/**
 * delimters are described in text so they can be easily read in a url.
 * this function takes the text description and returns the actual delimter
 * @param {string} delimterDescription - describing the delimiter 
 * @returns the actual delimiter to use
 */
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

/**
 * 
 * @param {string} data - read from the file.  A new line delimited string
 * @param {string} delimiterType - the delimiter description 
 * @returns {object} - the result of file validation
 */
export const validateFile = (data, delimiterType) => {
    
    //get the actual delimiter from the description 
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

/**
 * Read data a text from file uploaded.  
 * Also validate it and return a preview of the top few lines to be displayed
 * 
 * @param {Object} e - DOM Event 
 * @param {string} delimter - used to define columns in files
 */
export const processNewFile = (e, delimter) => {

    const result = {}

    const data = e.target.result;
    const validationResponse = validateFile(data, delimter);

    if (data) {
        
        const topArray = data.split("\n");

        //take top 5 lines for the preview unless the file has less than 5 lines
        const topLineCount = topArray.length > 5 ? 5 : topArray.length;

        //ignore the first line in cases it is column headers
        const previewLines = topArray.splice(1, topLineCount);

        result.topLines = previewLines;
        result.columnCount = validationResponse.columnCount;

    }

    result.message = validationResponse.message;

    return result;

}

/**
 * If a file has already been uploaded but we are just changing the delimter type then re-process
 * 
 * @param {string} delimterType the new delimter file to split file columns with 
 * @param {array} topLines - the current array of preview lines to be processed against the new delimiter
 */
export const processExistingFile = (delimterType, topLines) => {

    const result = {}
    
    //convert back to original format when read in of string with new lines 
    const data = topLines.join("\n");
    
    const validationResponse = validateFile(data, delimterType);

    if (data) {        
        const topArray = data.split("\n");
        result.topLines = topArray;
        result.columnCount = validationResponse.columnCount;
    }

    result.message = validationResponse.message;

    return result;

}