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
        <Paper style={{ display: "flex" }}>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "auto", width: 320, marginRight: 8 }}>
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
                {selectedOperation && <Typography style={{ paddingLeft: 8, paddingTop: 8 }} variant="h6">{selectedOperation}</Typography>}                  
                {selectedOperation && <JSONPretty id="json-pretty" data={operationDetails}  theme={JSONPrettyMon}></JSONPretty>  }                
            </div>

        </Paper>
    );
}