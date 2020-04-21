
import React from 'react';
import { Button, Typography, Link } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

export default function Finished({ handleReset, schemaName, onCloseDialog }) {

  const exampleQuery = {
    class: "uk.gov.gchq.gaffer.operation.OperationChain",
    operations: [
      {
        class: "uk.gov.gchq.gaffer.operation.impl.get.GetAllElements",
        options: {
          "gaffer.federatedstore.operation.graphIds": `${schemaName}`
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
        You can now query your data from your new graph for example by posting the following query to &nbsp; 
        <Link href="http://localhost:8080/rest/v2/graph/operations/execute">
          http://localhost:8080/rest/v2/graph/operations/execute
        </Link>
      </Typography>

      <div style={{ border: "1px solid lightGrey", marginBottom: 32 }}>
        <JSONPretty id="json-payload" data={exampleQuery}></JSONPretty>
      </div>

      <Button onClick={onCloseDialog} variant="contained">
        Back to Manage Graphs
      </Button>
    </div>
  )

}
