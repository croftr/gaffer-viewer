
import React, { useLayoutEffect, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

export default function ReviewSchema({ schemaName, createdSchema }) {

    return (
        <div style={{ height: "100%" }}>
            
            {createdSchema &&
                <div style={{}}>
                    <Typography variant="h6">Review {schemaName} Schema</Typography>
                    <JSONPretty id="json-payload" data={createdSchema.schema}></JSONPretty>
                </div>
            }
        </div>
    )

}
