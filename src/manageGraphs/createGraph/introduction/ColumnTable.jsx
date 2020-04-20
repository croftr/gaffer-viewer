import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { DETAILED_COLUMNS } from "../../utils/validateCsv"

const styles = {}

export const ColumnTable = ({ classes }) => {
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Column</TableCell>
                <TableCell>Data type</TableCell>
                <TableCell>Required</TableCell>
                <TableCell>Description</TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(DETAILED_COLUMNS).map((key) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{DETAILED_COLUMNS[key].type}</TableCell>
                  <TableCell>{DETAILED_COLUMNS[key].mandatory}</TableCell>
                  <TableCell>{DETAILED_COLUMNS[key].description}</TableCell>                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}

ColumnTable.propTypes = {
    classes: PropTypes.object.isRequired,    
};

export default withStyles(styles)(ColumnTable);
