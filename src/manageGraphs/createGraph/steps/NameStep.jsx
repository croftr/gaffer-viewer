import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { TextField, Typography, Button } from '@material-ui/core';
import ValidIcon from '@material-ui/icons/CheckCircle';
import InvalidIcon from '@material-ui/icons/Clear';

const styles = {
    chooseSchemaName: {
        display: "flex",
        flexDirection: "column"
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center"
    },
    textField: {
        marginBottom: 16,
        marginTop: 16
    },
    validationResults: {
        display: "flex",
        alignItems: "center",
        marginTop: 16,
        marginLeft: 16
    },
    validIcon: {
        color: "green",
        marginLeft: 16
    },
    errorIcon: {
        color: "red",
        marginLeft: 16,
        marginRight: 4
    },
    messageIconWrapper: {
        display: "flex",
        alignItems: "center"
    }
}

const NameStep = ({ classes, onChangeSchemaName, schemaName, nameValidationStatus, onValidateSchemaName }) => {

    return (
        <div id="chooseSchemaName" className={classes.chooseSchemaName}>

            <Typography>It must be unique and not contain any spaces</Typography>

            <div className={classes.inputWrapper}  >

                <TextField
                    required                    
                    id="graph-name"
                    label="Graph name"
                    value={schemaName}
                    onChange={onChangeSchemaName}
                    className={classes.textField}
                />

                <div className={classes.validationResults}>          

                    <Button variant="contained" disabled={!schemaName} onClick={() => onValidateSchemaName(schemaName)}>Check Name</Button>

                    {nameValidationStatus.message !== "unknown" && nameValidationStatus.isValid && schemaName && (
                        <span className={classes.messageIconWrapper}>
                            <ValidIcon className={classes.validIcon} />                      
                        </span>
                    )}

                    {nameValidationStatus.message !== "unknown" && !nameValidationStatus.isValid && schemaName && (
                        <span className={classes.messageIconWrapper}>
                            <InvalidIcon className={classes.errorIcon} />
                            <Typography>{nameValidationStatus.message}</Typography>
                        </span>
                    )}

                </div>

            </div>

        </div>
    )
}

NameStep.propTypes = {
    classes: PropTypes.object.isRequired,
    onChangeSchemaName: PropTypes.func,
    schemaName: PropTypes.string,
    nameValidationStatus: PropTypes.object,
    onValidateSchemaName: PropTypes.func,
};

export default withStyles(styles)(NameStep);
