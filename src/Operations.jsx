import React from 'react';
import { getOperations, getOperationDetails } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import OperationIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'
import Paper from '@material-ui/core/Paper';


export default function Operations() {

    const [operations, setOperations] = React.useState([]);
    const [selectedOperation, setSelectedOperation] = React.useState();
    const [operationDetails, setOperationDetails] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const ops = await getOperations();
            setOperations(ops);
        }

        fetchData();

    }, []);

    const loadOperation = async (operation) => {
        setSelectedOperation(operation);
        const details = await getOperationDetails(operation);
        setOperationDetails(details);
    }

    return (
        <div id="operationsTab" style={{ display: "flex", height: "calc(100% - 48px)" }}>
            <List style={{ height: "100%", overflowY: "auto", width: 320 }}>
                {operations.map(op => (
                    <ListItem button onClick={() => loadOperation(op)} alignItems="flex-start" key={op}>
                        <ListItemAvatar>
                            <Avatar>
                                <OperationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={op.split(".")[8] || op.split(".")[7] || op.split(".")[6] || op.split(".")[5]} />
                    </ListItem>
                ))}
            </List>

            <div>
                {selectedOperation && (
                    <span style={{ display: "flex", alignItems: "center", padding: 8 }}>
                        <Avatar style={{ marginYop: 8, marginRight: 8 }}><OperationIcon /></Avatar>
                        <Typography style={{ paddingLeft: 8, paddingTop: 8 }}>{selectedOperation}</Typography>
                    </span>
                )}
                {selectedOperation && <JSONPretty style={{ marginLeft: 8, border: "1px solid lightGrey"}}  id="json-pretty" data={operationDetails} ></JSONPretty>}
            </div>

        </div>
    );
}