import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { execute } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GraphIcon from '@material-ui/icons/Storage';



export default function Graphs() {

    const [graphs, setGraphs] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const ops = await execute(
                {
                    class: "uk.gov.gchq.gaffer.federatedstore.operation.GetAllGraphIds"
                }
            );
            setGraphs(ops);
            console.log("got ops ", ops);
        }
        
        fetchData();
        
    }, []);
    
    return (
        <div>                        
            <List style={{ height: "calc(100vh - 104px)", overflowY: "scroll" }}>
                {graphs.map(graph => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <GraphIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={graph} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}