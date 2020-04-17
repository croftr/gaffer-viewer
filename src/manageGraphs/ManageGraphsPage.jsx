
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
import DeleteIcon from '@material-ui/icons/HighlightOff';
import JSONPretty from 'react-json-pretty';


export default function ManageGraphs({ graphs, loadGraph, schema, onDeleteGraph }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = React.useState();

    const loadSelectedGraph = (graph) => {
        setSelectedGraph(graph);
        loadGraph(graph);
    }

    const deleteGraph = (selectedGraph) => {
        setSelectedGraph(undefined)
        onDeleteGraph(selectedGraph);
    }

    return (
        <Paper style={{ height: "100%", padding: 16 }}>
            <Typography>My Graphs</Typography>

            <List style={{ height: "calc(100vh - 130px)", overflowY: "auto", width: 320, marginRight: 8 }}>
                {["All"].concat(graphs).map(graph => (
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

            <Dialog aria-labelledby="simple-dialog-title" open={isOpen} fullScreen>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <DialogTitle id="simple-dialog-title">Add Graph</DialogTitle>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <CreateGraphPage />
            </Dialog>

            <Fab variant="extended" color="primary" aria-label="add" onClick={() => setIsOpen(true)} style={{ position: "absolute", bottom: 48, right: 48 }} >
                <AddIcon style={{ marginRight: 8 }} />
                <span style={{ padding: 8 }}>Add Schema</span>
            </Fab>

        </Paper>
    )

}
