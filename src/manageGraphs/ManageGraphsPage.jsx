
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Tab, Tabs, TextField, Typography, IconButton, Avatar } from '@material-ui/core';
import CreateGraphIntroduction from "./createGraph/CreateGraphIntroduction";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GraphIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/Publish';
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
        marginRight: 8
    },
    manageGraphsHeader: {
        display: "flex",
        alignItems: "center",
        height: 48,
        justifyContent: "space-between",
        marginBottom: 8
    },
    marginLeft16: {
        marginLeft: 16
    },
    json: {
        border: "1px solid lightGrey",
        padding: 8
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
    }
}

export const ManageGraphs = ({ classes, graphs, loadGraph, schema, onDeleteGraph, loadSchemas }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoadOpen, setIsLoadOpen] = useState(false);
    const [graphToDelete, setGraphToDelete] = useState(false);
    const [isDeleteGraphOpen, setIsDeleteGraphOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState();
    const [confirmDeleteText, setConfirmDeleteText] = useState("");

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

                <List className={classes.graphsList}>
                    {graphs.map(graph => (
                        <ListItem
                            button
                            onClick={() => loadSelectedGraph(graph)}
                            key={graph}>
                            <ListItemAvatar>
                                <Avatar>
                                    <GraphIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={graph} />
                        </ListItem>
                    ))}
                </List>

                {selectedGraph &&
                    <div id="graphToManage">
                        <div className={classes.manageGraphsHeader}>
                            <Typography variant="h6">{selectedGraph}</Typography>
                            <div className="manageGraphButtons">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    startIcon={<LoadIcon />}
                                    onClick={() => setIsLoadOpen(true)}>
                                    Load Data
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => openDeleteGraph(selectedGraph)}
                                    className={classes.marginLeft16}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                        <JSONPretty
                            className={classes.json}
                            id="json-pretty"
                            data={schema} >
                        </JSONPretty>
                    </div>
                }

                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="add"
                    onClick={() => setIsOpen(true)}
                    className={classes.actionButton}
                >
                    <AddIcon classNmae={classes.addIcon} />
                    <span className={classes.buttonText}>Add Graph</span>
                </Fab>

            </Paper>

            <Dialog aria-labelledby="loadDatahDialog" open={isLoadOpen} maxWidth="lg">

                <div className={classes.loadDataHeader}>
                    <DialogTitle id="simple-dialog-title">Load Data</DialogTitle>

                    <IconButton onClick={() => setIsLoadOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <CreateGraphIntroduction onCloseDialog={() => setIsOpen(false)} loadSchemas={loadSchemas} />
            </Dialog>


            <Dialog aria-labelledby="createGraphDialog" open={isOpen} fullScreen>

                <div className={classes.createGraphHeader}>
                    <DialogTitle id="simple-dialog-title">Add Graph</DialogTitle>

                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <CreateGraphIntroduction onCloseDialog={() => setIsOpen(false)} loadSchemas={loadSchemas} />
            </Dialog>

            <Dialog aria-labelledby="deleteGraphDialog" open={isDeleteGraphOpen} onEnter={() => setConfirmDeleteText('')}>

                <div className={classes.deleteHeader} >
                    <DialogTitle id="simple-dialog-title">Delete {graphToDelete}</DialogTitle>
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

ManageGraphs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageGraphs);
