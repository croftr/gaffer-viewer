import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { steps } from "./steps"
import csvLogo from "../../images/csv4.png";

const styles = {
    graphMessage: {
        height: 35
    },
    header: { 
        display: "flex", 
        alignItems: "center", 
        marginBottom: 16  
    },
    headerText: {
        marginLeft: 16
    }
}

export const StepperHeader = ({ classes, activeStep, confirmedSchemaName }) => {

    return (
        <>
            <div className={classes.graphMessage}>
                {confirmedSchemaName && (
                    <Typography 
                        variant="h6" 
                        color="textSecondary" 
                        align="center">
                            Creating Graph {confirmedSchemaName}
                    </Typography>
                )} 
            </div>
            
            <div id="stepHeader" className={classes.header}>
                {steps[activeStep].icon}
                <Typography 
                    variant="h6" 
                    className={classes.headerText}>
                        {steps[activeStep].title}
                </Typography>                
            </div>            
        </>
    )
}

StepperHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepperHeader);