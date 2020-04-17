
import React from 'react';
import { Button, Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import EdgeTypeCreatedIcon from '@material-ui/icons/ShowChartRounded';
import EdgeCountLoadedIcon from '@material-ui/icons/ExposurePlus1Rounded';

//todo useLayoutEffect for post render rendering 
export default function Confirm({ schemaName, createdSchema = {} }) {

    return (
        <div id="confirmAndReviewStep" style={{ display: "flex" }}>
            <div className="schemaJson" style={{}}>
                <Typography variant="h6">{schemaName} Schema JSON</Typography>
                <JSONPretty id="json-payload" data={createdSchema.schema}></JSONPretty>
            </div>

            <div className="schemaSummary" style={{}}>
                <Typography variant="h6">Summary</Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EdgeCountLoadedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={createdSchema.edgeLoadCount}
                            secondary='Edges loaded'
                        />
                    </ListItem>
                    {createdSchema.edgeTypes.map(edgeType => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EdgeTypeCreatedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={edgeType}
                                secondary='Edge type created'
                            />
                        </ListItem>
                    ))}
                </List>



            </div>

        </div>
    )

}
