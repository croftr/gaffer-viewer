import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
    Tooltip,
    Typography,
    IconButton,
    Dialog,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@material-ui/core';

import JSONPretty from 'react-json-pretty';

import EdgeIcon from '@material-ui/icons/ShowChart';
import CodeIcon from '@material-ui/icons/Code';
import CloseIcon from '@material-ui/icons/Close';

import { steps } from "./steps";

const styles = {
    flex: {
        display: "flex"
    },
    buttonAndIcon: {
        display: "flex",
        alignItems: "center"
    },
    marginRight: {
        marginRight: 16
    },
    modalHeader: {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        borderBottom: "1px solid lightGrey", 
        padding: 16
    }
}

const ReviewStep = ({ classes, schemaName, createdSchema = {}, auths, authsRadioValue }) => {

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

        <div id="confirmAndReviewStep" className={classes.flex}>

            <div className="schemaSummary">
                <span className={classes.buttonAndIcon}>
                    <Typography className={classes.marginRight} variant="h6">Summary</Typography>
                    <Tooltip title="View full JSON" placement="right-start">
                        <IconButton onClick={() => setIsOpen(true)}>
                            <CodeIcon />
                        </IconButton>
                    </Tooltip>
                </span>

                <List>
                    {Object.keys(steps).filter(step => steps[step].reviewText).map(key =>
                        (
                            <ListItem key={key}>
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

            <Dialog open={isOpen} maxWidth="lg">
                <div className={classes.modalHeader}>
                    <Typography variant="h6">{schemaName}Schema JSON</Typography>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <DialogContent>
                    <JSONPretty data={createdSchema.schema}></JSONPretty>
                </DialogContent>
            </Dialog>

        </div>
    )
}

ReviewStep.propTypes = {
    classes: PropTypes.object.isRequired,
    schemaName: PropTypes.string,
    authsRadioValue: PropTypes.string,
    createdSchema: PropTypes.object,
    auths: PropTypes.array,
};

export default withStyles(styles)(ReviewStep);