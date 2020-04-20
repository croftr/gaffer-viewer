
import React, { useState } from 'react';
import { Tooltip, Typography, IconButton, Dialog } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import EdgeIcon from '@material-ui/icons/ShowChart';
import CodeIcon from '@material-ui/icons/Code';
import CloseIcon from '@material-ui/icons/Close';

import { steps } from "./steps";

export default function Confirm({ schemaName, createdSchema = {}, auths, authsRadioValue }) {

    const [isOpen, setIsOpen] = useState(false)

    const getPrimaryText = (key) => {
        return steps[key].reviewText;
    }

    const getSecondatyText = (key) => {

        if (key === "0") {
            return schemaName;
        } else if (key === "1") {
            if (authsRadioValue === "specifyGroups") {
                return auths.join(",");
            } else {
                return authsRadioValue;
            }

        } else if (key === "2") {
            return `${createdSchema.edgeLoadCount} edges uploaded`
        }
        else {
            return steps[key].reviewText;
        }
    }

    return (
        //list steps - name - auths - ....
        <div id="confirmAndReviewStep" style={{ display: "flex" }}>

            <div className="schemaSummary" style={{}}>
                <span className="buttonAndIcon" style={{ display: "flex", alignItems: "center" }}>
                    <Typography style={{ marginRight: 16 }} variant="h6">Summary</Typography>
                    <Tooltip title="View full JSON" placement="right-start">
                        <IconButton onClick={() => setIsOpen(true)}>
                            <CodeIcon />
                        </IconButton>
                    </Tooltip>
                </span>

                <List>
                    {Object.keys(steps).filter(step => steps[step].reviewText).map(key =>
                        (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        {steps[key].icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={getPrimaryText(key)}
                                    secondary={getSecondatyText(key)}
                                />
                            </ListItem>
                        )
                    )}
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EdgeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${createdSchema.edgeTypes.length} edge types created`}
                            secondary={createdSchema.edgeTypes.join(",")}
                        />
                    </ListItem>
                </List>

            </div>

            <Dialog open={isOpen}>
                <div className="schemaJson" style={{}}>
                    <div className="modalHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Typography variant="h6">{schemaName} Schema JSON</Typography>
                        <IconButton onClick={() => setIsOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    
                    <JSONPretty id="json-payload" data={createdSchema.schema}></JSONPretty>
                </div>
            </Dialog>

        </div>
    )

}
