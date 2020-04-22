
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
    Tooltip,
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

import Security from "./createGraph/steps/Security"

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
        marginBottom: 4
    },
    marginLeft16: {
        marginLeft: 16
    },
    json: {
        border: "1px solid lightGrey",
        padding: 8,
        overflowX: "auto",
        overflowY: "auto",
        width: "calc(100vw - 650px)",
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
        borderBottom: "1px solid lightGrey"
    },
    loadDataHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid lightGrey"
    },
    buttonText: {
        padding: 8
    },
    createGraphHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid lightGrey"
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
            <Dialog open={schemaIsOpen} maxWidth="lg">
                <div className="modalHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid lightGrey", padding: 16 }}>
                    <Typography variant="h6">{selectedGraph} Schema </Typography>
                    <IconButton onClick={() => setSchemaIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent>
                    <JSONPretty
                        className={classes.json}
                        data={schema} >
                    </JSONPretty>
                </DialogContent>
            </Dialog>

            <Dialog open={authsIsOpen} maxWidth="lg">
                <div className="modalHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid lightGrey", padding: 16 }}>
                    <Typography variant="h6">{selectedGraph} Auths</Typography>
                    <IconButton onClick={() => setAuthsIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent>

                    <Security
                        schemaName={selectedGraph}
                        onChangeAuths={onChangeAuths}
                        auths={auths}
                        authsRadioValue={authsRadioValue}
                        setAuthsRadioValue={setAuthsRadioValue}
                        isStepper={false}
                    />

                </DialogContent>
            </Dialog>


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
                    <div id="graphToManage">
                        <div className={classes.manageGraphsHeader}>

                            <Typography variant="h6">{selectedGraph}</Typography>

                            <Button
                                variant="contained"
                                startIcon={<CodeIcon />}
                                onClick={() => setSchemaIsOpen(true)}
                                className={classes.button}
                            >
                                View JSON
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<LoadIcon />}
                                onClick={() => setIsLoadOpen(true)}
                                className={classes.button}
                            >
                                Load Data
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<SecureIcon />}
                                onClick={() => setAuthsIsOpen(true)}
                                className={classes.button}
                            >
                                Manage Auths
                            </Button>

                            <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                onClick={() => openDeleteGraph(selectedGraph)}
                                className={classes.button}
                            >
                                Delete
                                </Button>

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

            <Dialog aria-labelledby="loadDatahDialog" open={isLoadOpen} maxWidth="lg">

                <div className={classes.loadDataHeader}>
                    <DialogTitle id="loaddataTitle">Load Data</DialogTitle>

                    <IconButton onClick={() => setIsLoadOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogContent>
                    <CreateGraphIntroduction onCloseDialog={() => setIsOpen(false)} loadSchemas={loadSchemas} />
                </DialogContent>

            </Dialog>

            <Dialog aria-labelledby="createGraphDialog" open={isOpen} fullScreen>

                <div className={classes.createGraphHeader}>
                    <DialogTitle id="addGraphTitle">Add Graph</DialogTitle>

                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogContent>
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

                <div className={classes.deleteBody}>
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

                </div>

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
