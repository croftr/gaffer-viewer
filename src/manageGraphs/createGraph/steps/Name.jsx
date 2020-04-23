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
        marginLeft: 16
    }
}

const Name = ({ classes, onChangeSchemaName, schemaName, nameValidationStatus, onValidateSchemaName }) => {

    return (
        <div id="chooseSchemaName" className={classes.chooseSchemaName}>

            <Typography>It must be unique and not contain any spaces</Typography>

            <div className={classes.inputWrapper}  >

                <TextField
                    required
                    placeholder="myGraph"
                    id="schema-name"
                    label="Schema name"
                    value={schemaName}
                    onChange={onChangeSchemaName}
                    className={classes.textField}
                />

                <div className={classes.validationResults}>
                    <Button variant="contained" disabled={!schemaName} onClick={() => onValidateSchemaName(schemaName)}>Check Name</Button>
                    {nameValidationStatus === "valid" && schemaName && <ValidIcon className={classes.validIcon} />}
                    {nameValidationStatus === "invalid" && <InvalidIcon className={classes.errorIcon} />}
                </div>

            </div>

        </div>
    )
}

Name.propTypes = {
    classes: PropTypes.object.isRequired,
    onChangeSchemaName: PropTypes.func,
    schemaName: PropTypes.string,
    nameValidationStatus: PropTypes.string,
    onValidateSchemaName: PropTypes.func,
};

export default withStyles(styles)(Name);
