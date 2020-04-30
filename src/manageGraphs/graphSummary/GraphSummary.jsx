
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Typography,
    Tooltip,
} from '@material-ui/core';

import EdgePieChart from "./EdgePieChart";

import PersonIcon from '@material-ui/icons/PersonOutline';
import DateIcon from '@material-ui/icons/CalendarToday';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const styles = {
    graphSummary: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 16,
        maxHeight: 300,
        minHeight: 300,        
    },
    textSummary: {
        flex: 1
    },
    chartSummay: {
        flex: 1,
    },
    iconTextWrapper: {
        display: "flex",
        alignItems: "flex-start",
        marginTop: 8
    },
    icon: {
        marginRight: 8
    }
}

export const GraphSummary = ({ classes, creationStats, statusStats }) => {

    return (
        <div id="graphSummary" className={classes.graphSummary}>

            <div className={classes.textSummary}>

                <div id="graphCreatedStats">

                    <span className={classes.iconTextWrapper}>
                        <Tooltip title="Creaetd by">
                            <PersonIcon className={classes.icon} color="action" />
                        </Tooltip>

                        <Typography>{creationStats.properties.createdBy}</Typography>
                    </span>

                    <span className={classes.iconTextWrapper}>
                        <Tooltip title="Creaetd on">
                            <DateIcon className={classes.icon} color="action" />
                        </Tooltip>

                        <Typography>{new Date(creationStats.properties.createdDate["java.util.Date"]).toDateString()}</Typography>
                    </span>

                    <span className={classes.iconTextWrapper}>
                        <Tooltip title="description">
                            <InfoIcon className={classes.icon} color="action" />
                        </Tooltip>
                        <Typography >{creationStats.properties.description}</Typography>
                    </span>
                </div>

            </div>

            <div className={classes.chartSummay}>
                <EdgePieChart statusStats={statusStats} />
            </div>
        </div >
    )
}

GraphSummary.propTypes = {
    classes: PropTypes.object.isRequired,
    creationStats: PropTypes.object,
    statusStats: PropTypes.object,
};

export default withStyles(styles)(GraphSummary);
