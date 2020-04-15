
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

export default function ReviewSchema({ schemaName, createdSchema }) {

    return (
        <div style={{ height: "100%" }}>
            <Typography>Review Schema</Typography>
            <div style={{  }}>
                <Typography variant="h6">Created {schemaName}</Typography>
                <JSONPretty id="json-payload" data={createdSchema}></JSONPretty>
            </div>
        </div>
    )

}
