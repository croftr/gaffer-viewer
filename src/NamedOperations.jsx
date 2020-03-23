import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { execute } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NamedOperationIcon from '@material-ui/icons/Group';

export default function NamedOperations() {

    const [namedOperations, setNamedOperations] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const ops = await execute(
                {
                    "class": "uk.gov.gchq.gaffer.named.operation.GetAllNamedOperations"
                }
            );

            console.log("got named ops ", ops);
            setNamedOperations(ops);

        }

        fetchData();

    }, []);

    return (
        <div>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "scroll" }}>
                {namedOperations.map(op => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <NamedOperationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={op.operationName} secondary={op.description} />
                    </ListItem>
                ))}
            </List>

        </div>
    );
}