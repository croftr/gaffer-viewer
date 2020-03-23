import React from 'react';
import { execute } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NamedOperationIcon from '@material-ui/icons/Group';
import { Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'

export default function NamedOperations() {

    const [namedOperations, setNamedOperations] = React.useState([]);
    const [selectedOperation, setSelectedOperation] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const ops = await execute(
                {
                    "class": "uk.gov.gchq.gaffer.named.operation.GetAllNamedOperations"
                }
            );
            setNamedOperations(ops);

        }

        fetchData();

    }, []);


    return (
        <div style={{ display: "flex" }}>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "auto", width: 320, marginRight: 8 }}>
                {namedOperations.map(op => (
                    <ListItem button onClick={() => setSelectedOperation(op)} alignItems="flex-start" key={op.operationName}>
                        <ListItemAvatar>
                            <Avatar>
                                <NamedOperationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={op.operationName} secondary={op.description} />
                    </ListItem>
                ))}
            </List>
            <div style={{ }}>
                {selectedOperation && <Typography variant="h5">{selectedOperation.operationName}</Typography>}
                {selectedOperation && <JSONPretty id="json-pretty" data={selectedOperation} theme={JSONPrettyMon}></JSONPretty>}

            </div>

        </div>
    );
}