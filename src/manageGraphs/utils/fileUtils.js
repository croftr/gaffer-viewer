import { validateFile } from "./validateUploadFile";

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
    const validationResponse = validateFile(data, "filename", delimter);

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
    
    const validationResponse = validateFile(data, "filename", delimterType);

    if (data) {        
        const topArray = data.split("\n");
        result.topLines = topArray;
        result.columnCount = validationResponse.columnCount;
    }

    result.message = validationResponse.message;

    return result;

}

