const SIMPLE_COLUMN_COUNT = 2;
const DETAIL_COLUMN_COUNT = 9;

export const validateCsvFile = (data) => {

    let validationResponse = "No data";

    if (data) {
        console.log("result ", data);
        const firstLine = data.substring(0, data.indexOf("\n"));
        console.log("first line ", firstLine);

        if (firstLine) {
            const columnCount = firstLine.split(",").length;
            console.log("column count is ", columnCount);
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