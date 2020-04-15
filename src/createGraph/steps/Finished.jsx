
import React, { useLayoutEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';

export default function Finished({ handleReset, schemaName }) {

    const exampleQuery = {
        "class": "uk.gov.gchq.gaffer.operation.OperationChain",
        "operations": [
          {
            "class": "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements"
          },
          {
            "class": "uk.gov.gchq.gaffer.operation.impl.Limit",
            "resultLimit": 10000,
            "truncate": true
          }
        ]
      }

    return (
        <div>
            <Typography>
                Graph {schemaName} has been successfully created
            </Typography>
            <Typography>
                You can now query your data from your new graph for example by posting the following query to  /rest/v2/graph/operations/execute
            </Typography>
            <Button onClick={handleReset}>
                Or query some sample data from the UI 
                Query {schemaName}
            </Button>
        </div>
    )

}
