
import React, { useLayoutEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

//todo useLayoutEffect for post render rendering 
export default function Confirm({ schemaName, createdSchema }) {

    return (
        <div>
            {createdSchema &&
                <div style={{}}>
                    <Typography variant="h6">{schemaName} Schema</Typography>
                    <JSONPretty id="json-payload" data={createdSchema.schema}></JSONPretty>
                </div>
            }
        </div>
    )

}
