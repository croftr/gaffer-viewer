import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GraphIcon from '@material-ui/icons/Storage';
import { Typography, Button } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';

export default function Graphs({ graphs, loadGraph, schema, onDeleteGraph }) {

    const [selectedGraph, setSelectedGraph] = React.useState();

    const loadSelectedGraph = (graph) => {
        setSelectedGraph(graph);
        loadGraph(graph);
    }

    return (
        <Paper style={{ display: "flex", padding: 16 }}>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "auto", width: 320, marginRight: 8 }}>
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
            <div style={{}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {selectedGraph && <Typography variant="h6">{selectedGraph}</Typography>}
                    {selectedGraph && <Button variant="contained" color="primary" onClick={() => onDeleteGraph(selectedGraph)} style={{ marginLeft: 16, background: "red" }}>Delete</Button>}
                </div>

                {selectedGraph && <JSONPretty style={{}} id="json-pretty" data={schema} theme={JSONPrettyMon}></JSONPretty>}

            </div>
        </Paper>
    );
}