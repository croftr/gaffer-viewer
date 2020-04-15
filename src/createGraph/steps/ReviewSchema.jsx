
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

export default function ReviewSchema({ schemaName, createdSchema }) {

    return (
        <div>
            <Typography>Review Schema</Typography>
            <div style={{ overflowY: "auto", height: "70%" }}>
                <Typography variant="h6">Created {schemaName}</Typography>
                <JSONPretty id="json-payload" data={createdSchema}></JSONPretty>
            </div>
        </div>
    )

}
