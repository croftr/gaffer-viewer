
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import CsvFormats from "./CsvFormats";
import LoadData from "./createGraph/steps/LoadData"
import { validateCsvFile } from "./utils/validateCsv";
import { fetchUploadDataGraph } from "../actions/GafferActions"

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NewEdgeIcon from '@material-ui/icons/ShowChart';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import csvLogo from "./images/csv4.png"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

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
    avatar: {
        background: "orange"
    }
}

/**
 * Top level page that lists all the graphs that the user as admin access to 
 * delete and maintian 
 */
const LoadDataDialog = ({ classes, schemaName, isLoadOpen, setIsLoadOpen }) => {

    const [file, setFile] = useState();
    const [createdSchema, setCreatedSchema] = useState('');

    const [filename, setFilename] = useState('');
    const [schemaLoadFailed, setSchemaLoadFailed] = useState(false);
    const [fileUploadMessage, setFileUploadMessage] = useState("");
    const [uploadInProgress, setUploadInProgress] = useState(false);

    const close = () => {
        setCreatedSchema('');
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
            const validationResponmse = validateCsvFile(e.target.result, e.target.files[0].name);
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

            const res = await fetchUploadDataGraph(formData, schemaName);

            if (res) {
                setCreatedSchema(res);

                if (res.loadSuccess === false) {
                    setSchemaLoadFailed(true);
                }
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
        <Dialog aria-labelledby="loadDataDialog" open={isLoadOpen} maxWidth={false}>

            <div className={classes.loadDataHeader}>
                <DialogTitle id="loaddataTitle">Load Data into {schemaName}</DialogTitle>

                <IconButton onClick={close}>
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogContent dividers className={classes.dialog}>
                <Typography className={classes.loadSubText}>
                    You can load data into you existing graph here.  If you add new edge types that dont currently exist they will be created and added to your schema
                </Typography>

                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="csv-content"
                        id="csvExpandPanelHeader"
                    >
                        <span className={classes.csvText}>
                            <img src={csvLogo} height="32" className={classes.csvLogo} />
                            <Typography paragraph>Supported CSV formats</Typography>
                        </span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <CsvFormats />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <LoadData
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
                />

                <TableContainer>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell>Edges processed</TableCell>
                                <TableCell>{createdSchema ? createdSchema.edgeLoadCount + createdSchema.rejectedEdgeLoadCount : 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Edges loaded</TableCell>
                                <TableCell>{createdSchema.edgeLoadCount || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Edges Rejected</TableCell>
                                <TableCell>{createdSchema.rejectedEdgeLoadCount || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Unsupported edge types</TableCell>
                                <TableCell>{createdSchema.newEdgeTypes ? createdSchema.newEdgeTypes.length : 0}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <List>
                    {createdSchema.newEdgeTypes && createdSchema.newEdgeTypes.map(edgeType => (
                        <ListItem key={edgeType}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <NewEdgeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={edgeType}
                                secondary="Unsupported edge type"
                            />
                        </ListItem>
                    ))}
                </List>
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
