
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';

export default function ChooseSchemaName({ onChangeSchemaName, schemaName }) {
    
    return (
        <div>
            <Typography>Choose Schema Name</Typography>
            <TextField
                    required
                    id="schema-name"
                    label="Schema name"
                    value={schemaName}
                    onChange={onChangeSchemaName}
                    style={{ marginBottom: 16 }}
                />
        </div>
    )

}
