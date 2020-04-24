
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Paper,
    Button,
    TextField,
    Typography,
    IconButton,
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@material-ui/core';

import CreateGraphIntroduction from "./createGraph/introduction/CreateGraphIntroduction";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import GraphIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/Publish';
import CodeIcon from '@material-ui/icons/Code';
import SecureIcon from '@material-ui/icons/Security';

import SecurityStep from "./createGraph/steps/SecurityStep"

import LoadDataDialog from "./LoadDataDialog";

import JSONPretty from 'react-json-pretty';

const styles = {
    paper: {
        height: "100%",
        padding: 16,
        display: "flex"
    },
    graphsList: {
        height: "calc(100vh - 130px)",
        overflowY: "auto",
        width: 320,
        marginRight: 8,
    },
    manageGraphsHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
        width: "100%"
    },
    marginLeft16: {
        marginLeft: 16
    },
    json: {
        padding: 8,
        overflowX: "auto",
        overflowY: "auto",
        width: "calc(100vw - 700px)",
        height: "calc(100vh - 180px)"
    },
    actionButton: {
        position: "absolute",
        bottom: 48,
        right: 48
    },
    addIcon: {
        marginRight: 8
    },
    deleteHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    loadDataHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonText: {
        padding: 8
    },
    createGraphHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    deleteBody: {
        padding: 32
    },
    noGraphsText: {
        margin: "auto"
    },
    listHeader: {
        marginBottom: 8
    },
    header: {
        display: "flex",
        alignItems: "center"
    },
    button: {
        width: 200
    },
    buttonWrapper: {
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
        padding: 32,
        border: "1px solid lightGrey",
        width: "100%"
    },
    buttonIcon: {
        position: "absolute",
        left: 10,
        bottom: 8
    },
    graphToManage: {
        width: "100%"
    },
    manageText: {
        marginLeft: 16
    }
}

/**
 * Top level page that lists all the graphs that the user as admin access to 
 * delete and maintian 
 */
export const ManageGraphsPage = ({ classes, graphs, loadGraph, schema, onDeleteGraph, loadSchemas }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [schemaIsOpen, setSchemaIsOpen] = useState(false);
    const [authsIsOpen, setAuthsIsOpen] = useState(false);
    const [isLoadOpen, setIsLoadOpen] = useState(false);
    const [graphToDelete, setGraphToDelete] = useState(false);
    const [isDeleteGraphOpen, setIsDeleteGraphOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState();
    const [confirmDeleteText, setConfirmDeleteText] = useState("");

    const [auths, setAuths] = useState([]);
    const [authsRadioValue, setAuthsRadioValue] = useState('justMe');

    const onChangeAuths = (e) => {
        setAuths(e.target.value)
    }

    const loadSelectedGraph = (graph) => {
        setSelectedGraph(graph);
        loadGraph(graph);
    }

    const deleteGraph = (selectedGraph) => {
        setSelectedGraph(undefined)
        onDeleteGraph(selectedGraph);
        setIsDeleteGraphOpen(false);
    }

    const openDeleteGraph = (selectedGraph) => {
        setIsDeleteGraphOpen(true);
        setGraphToDelete(selectedGraph)
    }

    return (
        <>
            <Paper className={classes.paper}>

                {(!graphs || graphs.length < 1) && (
                    <Typography
                        className={classes.noGraphsText}
                        variant="h4"
                        color="textSecondary">
                        You have no graphs
                    </Typography>
                )}
                {(graphs && graphs.length > 0) && (
                    <List
                        className={classes.graphsList}
                        subheader={<Typography className={classes.listHeader} variant="h6">My Graphs</Typography>}
                    >
                        {graphs.map(graph => (
                            <ListItem
                                button
                                onClick={() => loadSelectedGraph(graph)}
                                key={graph}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <GraphIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={graph} />
                            </ListItem>
                        ))}
                    </List>
                )}

                {selectedGraph &&
                    <div id="graphToManage" className={classes.graphToManage}>

                        <Typography variant="h6">{selectedGraph}</Typography>

                        <div className={classes.manageGraphsHeader}>

                            <div className={classes.buttonWrapper}>

                                <Button
                                    variant="contained"
                                    startIcon={<CodeIcon className={classes.buttonIcon} />}
                                    onClick={() => setSchemaIsOpen(true)}
                                    className={classes.button}
                                >
                                    View Schema
                                </Button>

                                <Typography className={classes.manageText}>Review the full JSON of the {selectedGraph} schema</Typography>

                            </div>

                            <div className={classes.buttonWrapper}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    startIcon={<LoadIcon className={classes.buttonIcon} />}
                                    onClick={() => setIsLoadOpen(true)}
                                    className={classes.button}
                                >
                                    Load Data
                                </Button>

                                <Typography className={classes.manageText}>Add elemment from CSV files</Typography>
                            </div>
                            <div className={classes.buttonWrapper}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    startIcon={<SecureIcon className={classes.buttonIcon} />}
                                    onClick={() => setAuthsIsOpen(true)}
                                    className={classes.button}
                                >
                                    Manage Auths
                                </Button>

                                <Typography className={classes.manageText}>Manage who can read data from {selectedGraph} </Typography>

                            </div>

                            <div className={classes.buttonWrapper}>

                                <Button
                                    color="secondary"
                                    variant="contained"
                                    startIcon={<DeleteIcon className={classes.buttonIcon} />}
                                    onClick={() => openDeleteGraph(selectedGraph)}
                                    className={classes.button}
                                >
                                    Delete
                                </Button>

                                <Typography className={classes.manageText}>Remove the {selectedGraph} graph and all it data</Typography>

                            </div>
                        </div>
                    </div>
                }

                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="add"
                    onClick={() => setIsOpen(true)}
                    className={classes.actionButton}
                >
                    <AddIcon className={classes.addIcon} />
                    <span className={classes.buttonText}>Add Graph</span>
                </Fab>

            </Paper>

            <Dialog open={schemaIsOpen} maxWidth="lg">
                <div className="modalHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
                    <Typography variant="h6">{selectedGraph} Schema </Typography>
                    <IconButton onClick={() => setSchemaIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent dividers>
                    <JSONPretty
                        className={classes.json}
                        data={schema} >
                    </JSONPretty>
                </DialogContent>
            </Dialog>

            <Dialog open={authsIsOpen}>

                <div className="modalHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, width: 600 }}>
                    <Typography variant="h6">{selectedGraph} Auths</Typography>
                    <IconButton onClick={() => setAuthsIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent dividers>
                    <SecurityStep
                        schemaName={selectedGraph}
                        onChangeAuths={onChangeAuths}
                        auths={auths}
                        authsRadioValue={authsRadioValue}
                        setAuthsRadioValue={setAuthsRadioValue}
                        isStepper={false}
                    />
                </DialogContent>
            </Dialog>

            <LoadDataDialog
                schemaName={selectedGraph}
                isLoadOpen={isLoadOpen}
                setIsLoadOpen={setIsLoadOpen}
            />

            <Dialog aria-labelledby="createGraphDialog" open={isOpen} fullScreen>

                <div className={classes.createGraphHeader}>
                    <DialogTitle id="addGraphTitle">Add Graph</DialogTitle>

                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogContent dividers>
                    <CreateGraphIntroduction onCloseDialog={() => setIsOpen(false)} loadSchemas={loadSchemas} />
                </DialogContent>

            </Dialog>

            <Dialog aria-labelledby="deleteGraphDialog" open={isDeleteGraphOpen} onEnter={() => setConfirmDeleteText('')}>

                <div className={classes.deleteHeader} >
                    <DialogTitle id="deleteGraphTitle">Delete {graphToDelete}</DialogTitle>
                    <IconButton onClick={() => setIsDeleteGraphOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent dividers>
                    <Typography paragraph>Enter name of graph to confirm delete</Typography>
                    <TextField
                        value={confirmDeleteText}
                        onChange={e => setConfirmDeleteText(e.target.value)}
                    />

                    <Button
                        disabled={!(confirmDeleteText === graphToDelete)}
                        color="secondary"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteGraph(graphToDelete)}
                        className={classes.marginLeft16}>
                        Delete
                </Button>

                </DialogContent>

            </Dialog>

        </>
    )
}

ManageGraphsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    graphs: PropTypes.array,
    //get the schema for the selected graph
    loadGraph: PropTypes.func,
    schema: PropTypes.object,
    onDeleteGraph: PropTypes.func,
    //refresh the list of graphs
    loadSchemas: PropTypes.func
};

export default withStyles(styles)(ManageGraphsPage);
