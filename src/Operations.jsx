import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getOperations } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import OperationIcon from '@material-ui/icons/Search';


export default function Operations() {

    const [operations, setOperations] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const ops = await getOperations();
            setOperations(ops);
            console.log("got ops ", ops);
        }

        fetchData();

    }, []);

    return (
        <div>

            <List style={{ height: "calc(100vh - 104px)", overflowY: "scroll" }}>
                {operations.map(op => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <OperationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={op} />
                    </ListItem>
                ))}
            </List>

        </div >
    );
}