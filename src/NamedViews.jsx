import React from 'react';
import { execute } from "./actions/GafferActions"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NamedViewIcon from '@material-ui/icons/RemoveRedEye';
import { Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai'

export default function NamedViews() {

    const [namedViews, setNamedViews] = React.useState([]);
    const [selectedView, setSelectedView] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const views = await execute(
                {
                    "class": "uk.gov.gchq.gaffer.named.view.GetAllNamedViews"
                }
            );                        
            setNamedViews(views);
        }

        fetchData();

    }, []);

    return (
        <div style={{ display: "flex" }}>
            <List style={{ height: "calc(100vh - 104px)", overflowY: "auto", width: 320, marginRight: 8 }}>
                {namedViews.map(view => (
                    <ListItem button onClick={() => setSelectedView(view)} alignItems="flex-start" key={view.name}>
                        <ListItemAvatar>
                            <Avatar>
                                <NamedViewIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={view.name} secondary={view.description} />
                    </ListItem>
                ))}
            </List>
            <div style={{}}>
                {selectedView && <Typography style={{ paddingLeft: 8, paddingTop: 8 }} variant="h6">{selectedView.name}</Typography>}
                {selectedView && <JSONPretty id="json-pretty" data={selectedView} theme={JSONPrettyMon}></JSONPretty>}
            </div>
        </div>
    );
}