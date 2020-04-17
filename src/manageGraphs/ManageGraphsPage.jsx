
import React, { useLayoutEffect, useState } from 'react';
import { Paper, Button, Tab, Tabs, TextField, Typography, IconButton, Avatar } from '@material-ui/core';
import CreateGraphPage from "./createGraph/CreateGraphPage";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GraphIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/Publish';
import JSONPretty from 'react-json-pretty';


export default function ManageGraphs({ graphs, loadGraph, schema, onDeleteGraph }) {

    const [isOpen, setIsOpen] = useState(false);
    const [graphToDelete, setGraphToDelete] = useState(false);
    const [isDeleteGraphOpen, setIsDeleteGraphOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState();

    const loadSelectedGraph = (graph) => {
        setSelectedGraph(graph);
        loadGraph(graph);
    }

    const deleteGraph = (selectedGraph) => {
        setSelectedGraph(undefined)
        onDeleteGraph(selectedGraph);
        setIsDeleteGraphOpen(false);
    }

    const loadData = (selectedGraph) => {
    }

    const openDeleteGraph = (selectedGraph) => {
        setIsDeleteGraphOpen(true);
        setGraphToDelete(selectedGraph)
    }

    return (
        <>
            <Paper style={{ height: "100%", padding: 16, display: "flex" }}>

                <List style={{ height: "calc(100vh - 130px)", overflowY: "auto", width: 320, marginRight: 8 }}>
                    {graphs.map(graph => (
                        <ListItem button onClick={() => loadSelectedGraph(graph)} key={graph}>
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
                        <div id="manageGraphsHeader" style={{ display: "flex", alignItems: "center", height: 48, justifyContent: "space-between" }}>
                            <Typography variant="h6">{selectedGraph}</Typography>
                            <div className="manageGraphButtons">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    startIcon={<LoadIcon />}
                                    onClick={() => loadData(selectedGraph)}>
                                    Load Data
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => openDeleteGraph(selectedGraph)}
                                    style={{ marginLeft: 16 }}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                        <JSONPretty
                            style={{
                                border: "1px solid lightGrey",
                                padding: 8
                            }}
                            id="json-pretty"
                            data={schema} >
                        </JSONPretty>
                    </div>
                }

                <Fab variant="extended" color="primary" aria-label="add" onClick={() => setIsOpen(true)} style={{ position: "absolute", bottom: 48, right: 48 }} >
                    <AddIcon style={{ marginRight: 8 }} />
                    <span style={{ padding: 8 }}>Add Graph</span>
                </Fab>

            </Paper>

            <Dialog aria-labelledby="createGraphDialog" open={isOpen} fullScreen>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <DialogTitle id="simple-dialog-title">Add Graph</DialogTitle>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <CreateGraphPage />
            </Dialog>

            <Dialog aria-labelledby="deleteGraphDialog" open={isDeleteGraphOpen} >

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <DialogTitle id="simple-dialog-title">Delete {graphToDelete}</DialogTitle>
                    <IconButton onClick={() => setIsDeleteGraphOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography>Enter name of graph to confirm delete</Typography>
                <TextField></TextField>

                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteGraph(graphToDelete)}
                    style={{ marginLeft: 16 }}>
                    Delete
                </Button>
            </Dialog>

        </>
    )

}
