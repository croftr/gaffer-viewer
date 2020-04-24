import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';

import NewEdgeIcon from '@material-ui/icons/ShowChart';

const styles = {
    avatar: {
        background: "orange"
    }
}

/**
 * This table displays information about csv columns that we take for uploading grpahs 
 */
const MissingEdgeList = ({ classes, createdSchema }) => {

    return (
        <List>
            {createdSchema.newEdgeTypes && createdSchema.newEdgeTypes.map(edgeType => (
                <ListItem key={edgeType}>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            <NewEdgeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={edgeType}
                        secondary="Unsupported edge type"
                    />
                </ListItem>
            ))}
        </List>
    );

}

MissingEdgeList.propTypes = {
    classes: PropTypes.object.isRequired,
    createdSchema: PropTypes.object
};

export default withStyles(styles)(MissingEdgeList);
