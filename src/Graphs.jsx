import React from 'react';
import { execute } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GraphIcon from '@material-ui/icons/Storage';
import { Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'

export default function Graphs() {

    // const JSONPrettyMon = require('react-json-pretty/dist/monikai');
    const [graphs, setGraphs] = React.useState([]);
    const [selectedGraph, setSelectedGraph] = React.useState();
    const [schema, setSchema] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const ops = await execute(
                {
                    class: "uk.gov.gchq.gaffer.federatedstore.operation.GetAllGraphIds"
                }
            );
            setGraphs(ops);
        }

        fetchData();

    }, []);

    const loadGraph = async (graph) => {
        setSelectedGraph(graph);

        const body = {
            "class": "uk.gov.gchq.gaffer.store.operation.GetSchema",
            "compact": true,
          "options" : {
             "gaffer.federatedstore.operation.graphIds" : graph
           }
         }

        const graphSchema = await execute(body);

        setSchema(graphSchema);
    }


    return (
        <div style={{ display: "flex" }}>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "auto", width: 320,  marginRight: 8 }}>
                {graphs.map(graph => (
                    <ListItem button onClick={() => loadGraph(graph)} key={graph}>
                        <ListItemAvatar>
                            <Avatar>
                                <GraphIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={graph} />
                    </ListItem>
                ))}
            </List>
            <div style={{ }}>
                {selectedGraph && <Typography variant="h5">{selectedGraph}</Typography>}                  
                {selectedGraph && <JSONPretty style={{}} id="json-pretty" data={schema} theme={JSONPrettyMon}></JSONPretty>  }
                
            </div>
        </div>
    );
}