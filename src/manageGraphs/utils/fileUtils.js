import { validateFile } from "./validateUploadFile";

export const readFile = (e, delimter) => {

    const result = {}
    var reader = new FileReader();

    // read csv file as text 
    reader.onload = (e) => {

        const data = e.target.result;
        const validationResponse = validateFile(data, "filename", delimter);

        if (data) {
                            
            const topArray = data.split("\n");
            
            const topLineCount = topArray.length > 5 ? 5 : topArray.length;
            //ignore the first line in cases it is column headers
            const previewLines = topArray.splice(1, topLineCount);

            
            result.topLines = previewLines;
            result.columnCount = validationResponse.columnCount;
                            
        }

        result.fileUploadMessage = validationResponse.message;

    };

    reader.readAsText(e.target.files[0]);

    return result;

}