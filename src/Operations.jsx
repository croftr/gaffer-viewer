import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        <div style={{ display: "flex" }}>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "auto", width: 300, marginRight: 8 }}>
                {operations.map(op => (
                    <ListItem button onClick={() => loadOperation(op)} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <OperationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={op.split(".")[8] || op.split(".")[7] || op.split(".")[6] || op.split(".")[5]} />
                    </ListItem>
                ))}
            </List>

            <div style={{ flex: 3 }}>
                {selectedOperation && <Typography variant="h5">{selectedOperation}</Typography>}                  
                {selectedOperation && <JSONPretty id="json-pretty" data={operationDetails}  theme={JSONPrettyMon}></JSONPretty>  }
                
            </div>

        </div >
    );
}