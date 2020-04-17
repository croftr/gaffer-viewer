
import React from 'react';
import { Button, Typography } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

export default function Finished({ handleReset, schemaName }) {

  const exampleQuery = {
    class: "uk.gov.gchq.gaffer.operation.OperationChain",
    operations: [
      {
        class: "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
        options : {
          "gaffer.federatedstore.operation.graphIds" : `${schemaName}`
        }
      },
      {
        class: "uk.gov.gchq.gaffer.operation.impl.Limit",
        resultLimit: 1000,
        truncate: true
      }
    ]
  }

  return (
    <div>
      <Typography variant="h6" paragraph>
        Graph {schemaName} has been successfully created!
      </Typography>

      <Typography paragraph>
        You can now query your data from your new graph for example by posting the following query to <a href="http://localhost:8080/rest/v2/graph/operations/execute">http://localhost:8080/rest/v2/graph/operations/execute</a>
      </Typography>

      <div style={{ border: "1px solid lightGrey", marginBottom: 32 }}>
        <JSONPretty id="json-payload" data={exampleQuery}></JSONPretty>
      </div>

      <Typography paragraph>
        Or query some sample data here
      </Typography>

      <Button onClick={handleReset} variant="contained">
        Query {schemaName}
      </Button>
    </div>
  )

}
