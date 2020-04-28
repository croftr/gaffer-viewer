
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

import UploadFileFormats from "./UploadFileFormats";
import LoadStep from "./createGraph/steps/LoadStep"
import { validateFile } from "./utils/validateUploadFile";
import { fetchUploadDataGraph } from "../actions/GafferActions"

import MissingEdgeList from "./MissingEdgeList";


const styles = {
    loadDataHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dialog: {
        width: 1000,
        height: 700
    },
    csvText: {
        display: "flex",
    },
    csvLogo: {
        marginRight: 8
    },
    loadSubText: {
        marginBottom: 8
    },
    panelDetails: {
        width: 1000,
        height: 500
    },
    expansionPanel: {
        marginBottom: 16
    },
}

const LoadDataDialog = ({ classes, schemaName, isLoadOpen, setIsLoadOpen }) => {

    const [file, setFile] = useState();
    const [createdSchema, setCreatedSchema] = useState({});

    const [filename, setFilename] = useState('');
    const [schemaLoadFailed, setSchemaLoadFailed] = useState(false);
    const [fileUploadMessage, setFileUploadMessage] = useState("");
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const [delimiterType, setDelimiterType] = useState("comma");

    const close = () => {
        setCreatedSchema({});
        setFile('');
        setFilename('');
        setSchemaLoadFailed(false);
        setFileUploadMessage('');
        setUploadInProgress(false);

        setIsLoadOpen(false)
    }

    const onSelectFile = e => {

        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        var reader = new FileReader();

        // read csv file as text 
        reader.onload = (e) => {
            const validationResponmse = validateFile(e.target.result, "fileName", delimiterType);
            setFileUploadMessage(validationResponmse);
        };

        reader.readAsText(e.target.files[0]);

    };

    const onUploadFile = async () => {

        setUploadInProgress(true);
        setSchemaLoadFailed(false);

        const formData = new FormData();

        formData.append('file', file);

        try {

            const res = await fetchUploadDataGraph(formData, schemaName, delimiterType);

            if (res) {
                setCreatedSchema(res);

                if (res.loadSuccess === false) {
                    setSchemaLoadFailed(true);
                }
            } else {
                //no response
                setSchemaLoadFailed(true);
            }

        } catch (err) {
            setSchemaLoadFailed(true);
            console.error("error loading file ", err);
        }
    };

    return (
        <Dialog aria-labelledby="loadDataDialog" open={isLoadOpen} maxWidth={false}>
            <div className={classes.loadDataHeader}>
                <DialogTitle id="loaddataTitle">Load Data into {schemaName}</DialogTitle>

                <IconButton onClick={close}>
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogContent dividers className={classes.dialog}>
                <Typography className={classes.loadSubText}>
                    You can load data into you existing graph here.  You can only add edge groups that already exist.  To add new edge groups you will first need to modify your existing Schema.
                </Typography>

                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="csv-content"
                        id="csvExpandPanelHeader"
                    >
                        <Typography>Supported File formats</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <UploadFileFormats />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <LoadStep
                    isFromStepper={false}
                    schemaName={schemaName}
                    onSelectFile={onSelectFile}
                    filename={filename}
                    file={file}
                    onUploadFile={onUploadFile}
                    isLoadSuccess={createdSchema.loadSuccess}
                    elemetsLoaded={createdSchema.edgeLoadCount}
                    schemaLoadFailed={schemaLoadFailed}
                    fileUploadMessage={fileUploadMessage}
                    isUploadInProgress={uploadInProgress}
                    createdSchema={createdSchema}
                    delimiterType={delimiterType}
                    setDelimiterType={setDelimiterType}
                />

                <MissingEdgeList createdSchema={createdSchema} />

            </DialogContent>
        </Dialog >
    )
}

LoadDataDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    schemaName: PropTypes.string,
    isLoadOpen: PropTypes.bool,
    setIsLoadOpen: PropTypes.func
};

export default withStyles(styles)(LoadDataDialog);
