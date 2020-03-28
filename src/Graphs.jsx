import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GraphIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import JSONPretty from 'react-json-pretty';
import { Paper, IconButton, Typography, Avatar } from '@material-ui/core';


export default function Graphs({ graphs, loadGraph, schema, onDeleteGraph }) {

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
        <Paper style={{ display: "flex", padding: 16 }}>
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
            <div style={{}}>
                <div style={{ display: "flex", alignItems: "center", height: 48 }}>
                    {selectedGraph && <Typography variant="h6">{selectedGraph}</Typography>}
                    {selectedGraph && selectedGraph !== "All" && (
                        <IconButton title="Delete schema" color="secondary" onClick={() => deleteGraph(selectedGraph)} style={{ marginLeft: 0 }}>
                            <DeleteIcon />
                        </IconButton>)}
                    
                </div>

                {selectedGraph && <JSONPretty style={{ border: "1px solid lightGrey"}} id="json-pretty" data={schema} ></JSONPretty>}

            </div>
        </Paper>
    );
}