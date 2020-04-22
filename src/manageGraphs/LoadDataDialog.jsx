
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';


import CloseIcon from '@material-ui/icons/Close';

import CsvFormats from "./CsvFormats";
import LoadData from "./createGraph/steps/LoadData"
import { validateCsvFile } from "./utils/validateCsv";

import { fetchUploadDataGraph } from "../actions/GafferActions"

const styles = {
    loadDataHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
}

/**
 * Top level page that lists all the graphs that the user as admin access to 
 * delete and maintian 
 */
export const LoadDataDialog = ({ classes, schemaName, isLoadOpen, setIsLoadOpen }) => {

    const [file, setFile] = useState();
    const [createdSchema, setCreatedSchema] = useState('');
    

    const [filename, setFilename] = useState('');
    const [schemaLoadFailed, setSchemaLoadFailed] = useState(false);
    const [fileUploadMessage, setFileUploadMessage] = useState("");
    const [uploadInProgress, setUploadInProgress] = useState(false);

    const onSelectFile = e => {

        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        var reader = new FileReader();

        // read csv file as text 
        reader.onload = (e) => {
            const validationResponmse = validateCsvFile(e.target.result);
            setFileUploadMessage(validationResponmse);
        };

        reader.readAsText(e.target.files[0]);

    };

    const onUploadFile = async e => {

        setUploadInProgress(true);

        e.preventDefault();

        setSchemaLoadFailed(false);

        const formData = new FormData();

        formData.append('file', file);

        try {

            console.log("uplaod data !!!");
            
            const res = await fetchUploadDataGraph(formData, schemaName);

            if (res) {
                setCreatedSchema(res);
            } else {
                setSchemaLoadFailed(true);
                console.log("no response data ");
            }

        } catch (err) {
            setSchemaLoadFailed(true);
            console.error("error loading file ", err);

        }
    };

    return (
        <Dialog aria-labelledby="loadDataDialog" open={isLoadOpen} maxWidth="lg">

            <div className={classes.loadDataHeader}>
                <DialogTitle id="loaddataTitle">Load Data</DialogTitle>

                <IconButton onClick={() => setIsLoadOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogContent dividers>
                <LoadData
                    schemaName={schemaName}
                    onSelectFile={onSelectFile}
                    filename={filename}
                    file={file}
                    onUploadFile={onUploadFile}
                    isLoadSuccess={createdSchema.loadSuccess}
                    elemetsLoaded={createdSchema.edgeLoadCount}
                    schemaLoadFailed={schemaLoadFailed}
                    fileUploadMessage={fileUploadMessage}                    
                    uploadInProgress={uploadInProgress}
                />

                <CsvFormats />
            </DialogContent>
        </Dialog>
    )

}

LoadDataDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    schemaName: PropTypes.string
};

export default withStyles(styles)(LoadDataDialog);
