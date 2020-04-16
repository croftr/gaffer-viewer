
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import ValidIcon from '@material-ui/icons/Done';
import InvalidIcon from '@material-ui/icons/Clear';
import StorageIcon from '@material-ui/icons/Storage';

export default function ChooseSchemaName({ onChangeSchemaName, schemaName, nameValidationStatus, onValidateSchemaName, confirmedSchemaName }) {

    return (
        <div id="chooseSchemaName" style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">What will your graph be called?</Typography>
            <Typography>It must be unique and not contain any spaces</Typography>

            <div className="inputWrapper" style={{ display: "flex", alignItems: "center" }}>

                <TextField
                    required
                    placeholder="myGraph"
                    id="schema-name"
                    label="Schema name"
                    value={schemaName}
                    onChange={onChangeSchemaName}
                    style={{ marginBottom: 16, marginTop: 16 }}
                />

                <div className="validationResults" style={{ display: "flex", alignItems: "center", marginTop: 16, marginLeft: 16 }}>
                    <Button onClick={() => onValidateSchemaName(schemaName)}>Check Name</Button>
                    {nameValidationStatus === "valid" && <ValidIcon style={{ color: "green" }} />}
                    {nameValidationStatus === "invalid" && <InvalidIcon style={{ color: "red" }} />}
                </div>

            </div>

            { nameValidationStatus === "valid" && (
                <div className="confirmedSchemaName" style={{ display: "flex", alignItems: "center", alignSelf: "center" }}>
                    <StorageIcon style={{ marginRight: 16 }} />
                    <Typography variant="h6" align="center">Creating Schema with name {confirmedSchemaName}</Typography>
                </div>            
            )}

        </div>
    )

}
