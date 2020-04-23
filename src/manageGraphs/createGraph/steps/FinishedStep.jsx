
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Button, Typography, Link } from '@material-ui/core';
import JSONPretty from 'react-json-pretty';

const styles = {
  jsonWrapper: {
    border: "1px solid lightGrey",
    marginBottom: 32
  }
}

const FinishedStep = ({ classes, schemaName, onCloseDialog }) => {

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

      <div className={classes.jsonWrapper}>
        <JSONPretty id="json-payload" data={exampleQuery}></JSONPretty>
      </div>

      <Button onClick={onCloseDialog} variant="contained">
        Back to Manage Graphs
      </Button>
    </div>
  )

}

FinishedStep.propTypes = {
  classes: PropTypes.object.isRequired,
  schemaName: PropTypes.string,
  onCloseDialog: PropTypes.func,
};

export default withStyles(styles)(FinishedStep);